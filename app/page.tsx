import React from "react";
import Image from "next/image";

import localFont from "next/font/local";
import Link from "next/link";
import SelectTopicLayout from "./_components/SelectTopicLayout";

const myFont = localFont({
  src: "../public/fonts/Rubik-VariableFont_wght.ttf", // Correct path relative to the public folder
  variable: "--font-Rubik",
});

export default function page() {
  // console.log(data);
  return (
    <div
      className={` grid grid-cols-1 sm:grid-cols-2  px-3 pt-6 font-Rubik max-w-[900px] mx-4 sm:mx-auto`}
    >
      <div className={`${myFont.variable} leading-12`}>
        <h1 className="text-white font-sans text-[40px] sm:text-[56px] flex flex-col">
          Welcome to the
        </h1>
        <span className="font-bold text-[45px] sm:text-[56px] text-white">
          Frontend Quiz!
        </span>
        <p className="mt-1 mb-6 text-lg italic text-light-bluish">
          Pick a subject to get started.
        </p>
      </div>
      <div>
        <SelectTopicLayout />
      </div>
    </div>
  );
}
