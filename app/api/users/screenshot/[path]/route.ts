import { NextRequest, NextResponse } from "next/server";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import puppeteer from "puppeteer";
import { tokenDataId } from "@/helper/tokenData";
import { app } from "@/helperComponents/firebase";
import User from "@/db/models/userSchema";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string } }
) {
  const url = `http://localhost:3000/${params.path}`;
  const cookies = request.cookies.get("authtoken") as {
    name: string;
    value: string;
  };

  const cookieObj = {
    name: cookies.name,
    value: cookies.value,
    domain: "localhost",
    path: "/",
    expires: Math.floor(Date.now() / 1000) + 3600,
  };

  const user = await tokenDataId(request, true);
  if (!user) {
    return NextResponse.json(
      {
        message: "You are not authorized",
        success: false,
      },
      { status: 200 }
    );
  }

  if (!url) {
    return NextResponse.json(
      {
        message: "There is no URL",
      },
      { status: 400 }
    );
  }

  let browser;

  try {
    browser = await puppeteer.launch({});
    const page = await browser.newPage();

    await page.setCookie(cookieObj);
    await page.setViewport({ width: 1920, height: 1080 });
    const puppet = await page.goto(url);

    function delay(timeout: number) {
      return new Promise((resolve) => {
        setTimeout(resolve, timeout);
      });
    }

    await delay(30000);
    const screenshot = await page.screenshot({ type: "png" });
    // firebase stuff
    const storage = getStorage(app);
    const filename = user.name + new Date().getTime();

    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, screenshot);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;

          case "storage/unknown":
            break;
        }
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        const response = await User.findByIdAndUpdate(
          user._id,
          {
            $push: {
              screenshots: downloadUrl,
            },
          },
          { new: true }
        );
        if (!response) {
          return NextResponse.json(
            {
              message: "Error while saving the file",
              success: false,
            },
            { status: 400 }
          );
        }
        return NextResponse.json(
          {
            message: "Screenshot saved to DB successfully",
            success: true,
          },
          { status: 200 }
        );
      }
    );
    return NextResponse.json({
      message: "Screenshot captured successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
        sucess: 400,
      },
      { status: 400 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
    return NextResponse.json({
      message: "Done",
    });
  }
}
