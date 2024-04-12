import Project from "@/db/models/projectSchema";
import TimeEntries from "@/db/models/timeEntries";
import User from "@/db/models/userSchema";
import { tokenDataId } from "@/helper/tokenData";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await tokenDataId(request, true);

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        {
          message: "You are not authorized to delete this",
          success: false,
        },
        { status: 401 }
      );
    }
    const TimeEntryUser = await TimeEntries.findById(params.id).select([
      "user_id",
      "project_id",
      "duration",
    ]);
    if (!TimeEntryUser) {
      return NextResponse.json(
        {
          message: "Entry does not exist in User",
          sucess: false,
        },
        { status: 400 }
      );
    }
    const userId = TimeEntryUser.user_id;
    const projectId = TimeEntryUser.project_id;
    const entryDuration = TimeEntryUser.duration;
    if (!userId) {
      return NextResponse.json(
        {
          message: "This Entry doesnot have any current user",
          success: false,
        },
        { status: 400 }
      );
    }
    const updatedUserPromise = User.updateOne(
      { _id: userId },
      {
        $pull: {
          timeentries: params.id,
        },
      },
      { new: true }
    );
    const durationInHours = entryDuration / (1000 * 60 * 60);

    const updatedProjectPromise = Project.findByIdAndUpdate(
      projectId,
      {
        $inc: {
          hoursLeft: durationInHours,
          hoursConsumed: -durationInHours,
        },
      },
      { new: true }
    );
    const [project, updatedUser] = await Promise.all([
      updatedProjectPromise,
      updatedUserPromise,
    ]);

    await TimeEntries.findByIdAndDelete(params.id);

    return NextResponse.json({
      message: "Deleted Sucessfully",
      project,
      updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Backend Error",
        success: false,
      },
      { status: 400 }
    );
  }
}
