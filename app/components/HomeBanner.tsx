import Image from "next/image";
import React from "react";

export default function HomeBanner() {
  return (
    <div className="relative bg-gradient-to-r from-sky-500 to-sky700 mb-8">
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="mb-8 md:mb-0 text-center">
          <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">
            {" "}
            Winter Sale!
          </h1>
          <p className="text-lg md:text-xl mb-2 text-white">
            {" "}
            Enjoy discounts on selected items{" "}
          </p>
          <p className="text-2xl md:text-5xl text-yellow-400 font-bold">
            {" "}
            GET 50% OFF
          </p>
        </div>
        <div className="w-1/3 relative aspect-video">
          <Image
            src="/banner-image.png"
            alt="home-image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
