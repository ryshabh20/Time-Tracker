import { connect } from "@/db/dbConfig";

import { NextRequest, NextResponse } from "next/server";
import TimeEntries from "@/db/models/timeEntries";
import { tokenDataId } from "@/helper/tokenData";
import User from "@/db/models/userSchema";

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
      });
      const savedEntry = await newTimeEntry.save();

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            isTimer: !userData.isTimer,
          },
          $push: {
            timeentries: savedEntry,
          },
        },
        { new: true }
      );
      const updatedTimer = !userData.isTimer;
      return NextResponse.json({
        message: "time entry created successfully",
        success: true,
        savedEntry,
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
          },
        },
        { new: true }
      );
      const updatedTimer = !userData.isTimer;
      return NextResponse.json({
        message: "time entry stopped successfully",
        success: true,
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
