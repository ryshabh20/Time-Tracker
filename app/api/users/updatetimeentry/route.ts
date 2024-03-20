import { connect } from "@/db/dbConfig";

import { NextRequest, NextResponse } from "next/server";
import TimeEntries from "@/db/models/timeEntries";
import { tokenDataId } from "@/helper/tokenData";
import User from "@/db/models/userSchema";

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
      const newTimeEntry = await new TimeEntries({
        user_id: userId,
        start_time: new Date(),
        task: timeEntry.task,
        project_id: reqBody.projectId,
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
        message: "time entry created successfully",
        task: savedEntry.task,
        success: true,
        savedEntry,
        projectID: savedEntry.project_id,
        updatedTimer,
      });
    }
    if (userData.isTimer === true) {
      const timeEntryId = userData.timeentries[userData.timeentries.length - 1];
      const timeEntry = await TimeEntries.findOne({ _id: timeEntryId });
      console.log(timeEntry, timeEntryId);

      if (!timeEntry) {
        return NextResponse.json({
          message: "Time entry not found",
          success: false,
        });
      }
      const durationInMillis =
        new Date().getTime() - timeEntry.start_time.getTime();
      const updatedTimeEntry = await TimeEntries.findByIdAndUpdate(
        timeEntryId,
        {
          $set: {
            end_time: new Date(),
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
      const updatedTimer = updatedUser.isTimer;
      return NextResponse.json({
        message: "time entry stopped successfully",
        task: "",
        success: true,
        updatedTimer,
        projectID: "",
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