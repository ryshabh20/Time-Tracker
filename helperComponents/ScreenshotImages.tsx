"use client";
import React, { useState } from "react";
import Image from "next/image";

const ScreenshotImages = ({ images }: { images: string[] }) => {
  const [modal, setModal] = useState<string | null>();

  const openModal = (image: string) => {
    setModal(image);
  };
  const closeModal = () => {
    setModal(null);
  };

  return (
    <div className="grid grid-cols-4">
      {images?.map((img: string, index: number) => {
        return (
          <div
            className=""
            key={index}
            onClick={() => {
              openModal(img);
            }}
          >
            {" "}
            <Image
              className="object-fill h-full w-full"
              src={img}
              height={200}
              width={200}
              alt="src"
            />
          </div>
        );
      })}
    </div>
  );
};

export default ScreenshotImages;
