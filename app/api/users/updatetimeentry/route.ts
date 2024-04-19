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
    const timeEntryId = reqBody.id;
    const timeEntry = await TimeEntries.findById(timeEntryId);
    if (!timeEntry) {
      return NextResponse.json(
        {
          message: "No time Entries found",
          success: false,
        },
        {
          status: 400,
        }
      );
    }
    const userId = timeEntry.user_id.toString();

    const tokenId = await tokenDataId(request);
    if (userId !== tokenId) {
      return NextResponse.json(
        {
          message: "You can only update your time entries",
          success: "false",
        },
        { status: 401 }
      );
    }
    const userData = await User.findById(userId);
    if (!userData) {
      return NextResponse.json(
        {
          message: "User doesnot exist please refresh the page",
          success: false,
        },
        { status: 400 }
      );
    }
    if (userData.isTimer === false) {
      const currentProject = timeEntry.project_id;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            isTimer: !userData.isTimer,
            "currentTask.description": timeEntry.task,
            "currentTask.startedAt": new Date(),
            "currentTask.currentProject.projectId": currentProject,
            "currentTask.currentProject.projectName": reqBody.projectname,
          },
          // $push: {
          //   timeentries: savedEntry,
          // },
        },
        { new: true }
      );
      const updatedTimer = updatedUser.isTimer;
      return NextResponse.json({
        message: "time entry created successfully",
        task: timeEntry.task,
        success: true,
        startedAt: updatedUser.currentTask.startedAt,
        projectID: timeEntry.project_id,
        projectName: updatedUser.currentTask.currentProject.projectName,
        updatedTimer,
      });
    }
    if (userData.isTimer === true) {
      const durationInMillis =
        new Date().getTime() - userData.currentTask.startedAt.getTime();
      const newTimeEntry = await new TimeEntries({
        user_id: userId,
        project_id: userData.currentTask.currentProject.projectId,
        start_time: userData.currentTask.startedAt,
        end_time: new Date(),
        task: reqBody.task,
        duration: durationInMillis,
      });
      const savedEntry = await newTimeEntry.save();

      const projectId = savedEntry.project_id;
      const durationInHours = durationInMillis / (1000 * 60 * 60);
      const project = await Project.findByIdAndUpdate(
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
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            "currentTask.description": reqBody.task,
            "currentTask.startedAt": new Date(),
            "currentTask.currentProject.projectId": reqBody.projectId,
            "currentTask.currentProject.projectName": reqBody.projectname,
          },
          $push: {
            timeentries: savedEntry,
          },
        },
        { new: true }
      );
      const updatedTimer = updatedUser.isTimer;
      return NextResponse.json({
        message: "time entry created and started successfully",
        task: savedEntry.task,
        success: true,
        startedAt: updatedUser.currentTask.startedAt,
        projectID: savedEntry.project_id,
        projectName: reqBody.projectname,
        updatedTimer,
      });
    }
    return NextResponse.json({
      message: "Error occured",
      success: false,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
