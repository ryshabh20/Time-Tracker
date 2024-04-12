import ScreenshotImages from "@/helperComponents/ScreenshotImages";
import GetCookie from "@/helperComponents/getcookies";

async function getScreenshots() {
  const cookie = await GetCookie();
  try {
    const url =
      process.env.NODE_ENV === "production"
        ? "https://time-tracker-xi-three.vercel.app/api/users/getscreenshots/"
        : "http://localhost:3000/api/users/getscreenshots/";

    const res = await fetch(url, {
      headers: {
        Cookie: `authtoken=${cookie}`,
      },
      next: { tags: ["collection"] },
    });

    const data = await res.json();
    return data.screenshots;
  } catch (error) {
    throw new Error("Error fetching the data from the route");
  }
}

const Screenshot = async () => {
  const images = await getScreenshots();

  return (
    <div>
      <span className="text-2xl">Screenshots</span>
      {images?.length > 0 && (
        <div className="bg-[#e9e9e9] items-center flex justify-between mt-7 px-2 py-2">
          <span>All Screenshots</span> <span>{images.length}</span>
        </div>
      )}
      <ScreenshotImages images={images} />
    </div>
  );
};

export default Screenshot;
