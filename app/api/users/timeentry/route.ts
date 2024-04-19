import { connect } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import TimeEntries from "@/db/models/timeEntries";
import { tokenDataId } from "@/helper/tokenData";
import User from "@/db/models/userSchema";
import Project from "@/db/models/projectSchema";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const userId = await tokenDataId(request);
    if (!userId) {
      return NextResponse.json(
        {
          message: "You can only update your time entries",
          success: "false",
        },
        { status: 401 }
      );
    }
    const userData = await User.findOne({ _id: userId }).select("-password");

    if (userData.isTimer === false) {
      const currentTaskDescription = reqBody.task;
      const currentProject = reqBody?.project?.projectId;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            isTimer: !userData.isTimer,
            "currentTask.description": currentTaskDescription,
            "currentTask.startedAt": new Date(),
            "currentTask.currentProject.projectId": currentProject,
            "currentTask.currentProject.projectName":
              reqBody.project.projectName,
          },
        },
        { new: true }
      );

      const updatedTimer = updatedUser.isTimer;
      return NextResponse.json({
        message: "Time entry created successfully",
        task: updatedUser.currentTask.description,
        startedAt: updatedUser.currentTask.startedAt,
        success: true,
        project: {
          projectId: currentProject,
          projectName: reqBody.project.projectName,
        },
        updatedTimer,
      });
    }
    if (userData.isTimer === true) {
      const durationInMillis =
        new Date().getTime() - userData.currentTask.startedAt.getTime();

      const newTimeEntry = await new TimeEntries({
        user_id: userId,
        project_id: reqBody.project.projectId,
        start_time: userData.currentTask.startedAt,
        end_time: new Date(),
        task: reqBody.task,
        duration: durationInMillis,
      });

      const savedEntry = await newTimeEntry.save();
      const projectId = savedEntry.project_id;
      const durationInHours = durationInMillis / (1000 * 60 * 60);

      const userPromise = User.findByIdAndUpdate(
        userId,
        {
          $set: {
            isTimer: !userData.isTimer,
            "currentTask.description": "",
            "currentTask.startedAt": null,
            "currentTask.currentProject.projectId": null,
            "currentTask.currentProject.projectName": "",
          },
          $push: {
            timeentries: savedEntry,
          },
          $addToSet: {
            projects: savedEntry.project_id,
          },
        },
        { new: true }
      );
      const projectPromise = Project.findByIdAndUpdate(
        projectId,
        {
          $inc: {
            hoursLeft: -durationInHours,
            hoursConsumed: durationInHours,
          },
        },
        {
          new: true,
        }
      );
      const [updatedUser, updatedProject] = await Promise.all([
        userPromise,
        projectPromise,
      ]);

      const updatedTimer = updatedUser.isTimer;
      return NextResponse.json({
        message: "Time entry stopped successfully",
        task: "",
        success: true,
        updatedTimer,
        project: {
          projectId: "",
          projectName: "",
        },
      });
    }
    return NextResponse.json({
      message: "Error occured",
      success: false,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
