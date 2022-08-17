import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { modalConfig } from "../config/model";

const index = ({ props }) => {
  const { modalState, setModalState } = props;


  return (
    <>
      <div className="flex flex-col justify-center items-center bg-[#303030] rounded-[10px] z-100 p-8 w-[700px] relative">
        <button className="btn text-white cursor-pointer absolute top-[4px] right-[4px] text-4xl "

          onClick={() => setModalState(modalConfig.MODEL_DESTROYED)}

        >
          <AiFillCloseCircle />
        </button>
        <h1 className="text-[18px] font-bold text-[#FFFFFF] mb-5">Assign</h1>

        <div className="flex flex-col md:flex-row gap-3 md:gap-[22px] mb-5 w-full">
          <div className="w-full md:w-[34%]">
            <label
              htmlFor="address"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              Date *
            </label>
            <input
              type="date"
              name="address"
              placeholder="Flat no. 6, Second floor, Rohine Residency"
              className="w-full text-[14px] px-4 py-[10px] rounded outline-none"
            />
          </div>
          <div className="w-full md:w-[33%]">
            <label
              htmlFor="address"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              Time *
            </label>
            <input
              type="time"
              name="address"
              placeholder="Guwahati"
              className="w-full bg-white text-[14px] px-4 py-[10px] rounded outline-none"
            />
          </div>
          <div className="w-full md:w-[33%]">
            <label
              htmlFor="address"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              Assign to *
            </label>
            <input
              type="text"
              name="Assign to"
              placeholder="Ram Krishan"
              className="w-full bg-white text-[14px] px-4 py-[10px] rounded outline-none"
            />
          </div>
        </div>

        <div className="w-full mb-5">
          <label
            htmlFor="address"
            className="block mb-1 font-semibold text-white text-semibold text-[15px]"
          >
            Remarks *
          </label>
          <textarea
            rows="6"
            placeholder="Please make sure you do thiss...."
            className="rounded-md w-full p-2"
          ></textarea>
        </div>
        <div className="bg-[#FFC044] w-1/2 mx-auto rounded-md text-center text-[15px] text-black font-normal cursor-pointer">
          <button className="py-4">Assign</button>
        </div>
      </div>
    </>
  );
};

export default index;
