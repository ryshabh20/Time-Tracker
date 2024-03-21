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
    const userId = reqBody.user._id;
    const tokenId = await tokenDataId(request);
    if (tokenId !== userId) {
      return NextResponse.json(
        {
          message: "You can only update your time entries",
          success: "false",
        },
        { status: 401 }
      );
    }
    const userData = await User.findOne({ _id: tokenId }).select("-password");
    if (userData.isTimer === false) {
      const newTimeEntry = await new TimeEntries({
        user_id: userId,
        start_time: new Date(),
        task: reqBody.task,
        project_id: reqBody.project.projectId,
      });
      const savedEntry = await newTimeEntry.save();

      const currentTaskDescription = savedEntry.task;
      const currentProject = savedEntry.project_id;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            isTimer: !userData.isTimer,
            "currentTask.description": currentTaskDescription,
            "currentTask.currentProject.projectId": currentProject,
            "currentTask.currentProject.projectName":
              reqBody.project.projectname,
          },
          $push: {
            timeentries: savedEntry,
          },
          $addToSet: {
            projects: currentProject,
          },
        },
        { new: true }
      );
      console.log("updatedUser", updatedUser);

      const updatedTimer = updatedUser.isTimer;
      return NextResponse.json({
        message: "Time entry created successfully",
        task: savedEntry.task,
        success: true,
        savedEntry,
        project: {
          projectId: savedEntry.project_id,
          projectName: reqBody.project.projectname,
        },
        updatedTimer,
      });
    }
    if (userData.isTimer === true) {
      const timeEntryId = userData.timeentries[userData.timeentries.length - 1];
      const projectId = reqBody.project.projectId;
      console.log("projectId", projectId);

      const timeEntry = await TimeEntries.findOne({ _id: timeEntryId });

      if (!timeEntry) {
        return NextResponse.json({
          message: "Time entry not found",
          success: false,
        });
      }
      const durationInMillis =
        new Date().getTime() - timeEntry.start_time.getTime();
      const durationInHours = durationInMillis / (1000 * 60 * 60);
      const updatedTimeEntry = await TimeEntries.findByIdAndUpdate(
        timeEntryId,
        {
          $set: {
            end_time: new Date(),
            task: reqBody.task,
            duration: durationInMillis,
          },
        },
        { new: true }
      );
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            isTimer: !userData.isTimer,
            "currentTask.description": "",
            "currentTask.currentProject.projectId": null,
            "currentTask.currentProject.projectName": "",
          },
        },
        { new: true }
      );

      const updatedProject = await Project.findByIdAndUpdate(
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
