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
      className={` grid grid-cols-1 md:grid-cols-2 lg:gap-x-[144px] md:gap-x-[50px]  px-3 pt-6 font-Rubik md:max-w-[1160px] mx-4 md:mx-auto`}
    >
      <div className={`${myFont.variable} md:leading-15 leading-11`}>
        <h1 className="dark:text-white text-text-light font-sans text-[40px] md:text-[30px] lg:text-[64px] flex flex-col">
          Welcome to the
        </h1>
        <span className="font-bold text-text-light text-[40px] md:text-[64px] dark:text-white">
          Frontend Quiz!
        </span>
        <p className="mt-1 mb-6 text-[14px] leading-5 italic dark:text-light-bluish text-grey-navy">
          Pick a subject to get started.
        </p>
      </div>
      <div>
        <SelectTopicLayout />
      </div>
    </div>
  );
}
