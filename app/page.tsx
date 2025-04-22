import React from "react";

import localFont from "next/font/local";
import SelectTopicLayout from "./_components/SelectTopicLayout";

const myFont = localFont({
  src: "../public/fonts/Rubik-VariableFont_wght.ttf", // Correct path relative to the public folder
  variable: "--font-Rubik",
});

export default function page() {
  // console.log(data);
  return (
    <div
      className={` grid grid-cols-1 md:grid-cols-2  px-3 pt-6 font-Rubik max-w-[900px] mx-4 md:mx-auto`}
    >
      <div className={`${myFont.variable} leading-14`}>
        <h1 className="dark:text-white text-text-light font-sans text-[40px] md:text-[50px] flex flex-col">
          Welcome to the
        </h1>
        <span className="font-bold text-text-light text-[45px] md:text-[50px] dark:text-white">
          Frontend Quiz!
        </span>
        <p className="mt-1 mb-6 text-lg italic dark:text-light-bluish text-grey-navy">
          Pick a subject to get started.
        </p>
      </div>
      <div>
        <SelectTopicLayout />
      </div>
    </div>
  );
}
