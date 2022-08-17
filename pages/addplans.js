// import { useState } from "react";
import Addplans from "../Components/Addplans/index";
import Sidebar from "../Components/Sidebar/index";
import { FaChevronDown } from "react-icons/fa";
import { mainContents } from "../styles/Home.module.css";
import Navbar from "../Components/Navbar/index";

const addplans = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-row min-h-full">
        {/* sidebar */}
        <div className="w-[255px] bg-[#141414] pt-[100px]">
          <Sidebar />
        </div>
        {/* main-content */}
        <section className={mainContents}>
          <div className="mx-auto my-5 w-[90%] px-[100px] border-2 border-[#EFEEEB] rounded-2xl">
            {/* partners */}
            <div>
              <Addplans />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default addplans;
