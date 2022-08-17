import React, { useState, Fragment, useEffect } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { Timestamp } from "firebase/firestore";
import { addData } from "../../utils/api";
import { modelName } from "../../utils/collections";
import { getPlans } from "../../utils/api"
import { AiFillCloseCircle } from "react-icons/ai";
import { modalConfig } from "../config/model";

const maxFeatureCharacter = "16"

const initialState = {
  packageName: "",
  vehicleType: "car",
  packageType: "",
  pricehatchback: "",
  pricesedan: "",
  priceminisuv: "",
  pricesuv: "",
  desc: "",
  fe1: "",
  fe2: "",
  fe3: "",
  fe4: "",
  fe5: "",
  timestamp: Timestamp.now(),
}

const AddPlanModal = ({ props}) => {
  const { modalState, setModalState } = props;
  const [plan, setplan] = useState(initialState)

  const addPlan = async (data) => {
    let val = await addData(data, modelName.PLANS);
    setModalState(modalConfig.MODEL_DONE);
    // location.reload();
  }

  useEffect(() => {
    if (plan.packageType === "onetime") {
      
      setplan({ ...plan, packageName: "One time wash" });
    }
}, [plan])

  return (
    <div className="absolute flex flex-col top-10 rounded-[10px] w-[800px]">
      <div className="bg-[#303030] relative mb-[50px] p-8 rounded-[10px]">
        <button className="btn text-white cursor-pointer absolute top-[4px] right-[4px] text-4xl "

          onClick={() => setModalState(modalConfig.MODEL_DESTROYED)}

        >
          <AiFillCloseCircle />
        </button>
        <h1 className="text-[18px] font-bold text-[#FFFFFF] mb-5">ADD PLAN</h1>

        <div className="flex md:flex-row flex-col items-center md:flex-wrap text-white md:gap-[22px] tracking-wider mt-12 font-sans gap-6">
          <div className="w-full md:w-[31%] items-center justify-around flex-wrap md:flex-row">
            <label
              htmlFor="vehicle"
              className="block mb-1 font-semibold text-[12px] md:text-[15px]"
            >
              Vehicle Type *
            </label>
            <select
              name="vehicleType"
              id="cars"
              className="w-full p-3 rounded-[5px] text-[#737373] mb-2 outline-none flex items-center"
              onChange={(e) => {
                setplan({ ...plan, vehicleType: e.target.value })
              }}
            >
              <option>--SELECT--</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
            </select>
          </div>
          <div className="w-full md:w-[30%] items-center justify-around flex-wrap md:flex-row">
            <label
              htmlFor="vehicle"
              className="block mb-1 font-semibold text-[12px] md:text-[15px]"
            >
              Package Type *
            </label>
            <select
              name="service"
              id="cars"
              className="w-full p-3 rounded-[5px] text-[#737373] mb-2 outline-none"
              onChange={(e) => {
                setplan({ ...plan, packageType: e.target.value })
              }}
            >
              <option>--SELECT--</option>
              <option value="subscription">Subscription wash</option>
              <option value="onetime">Onetime wash</option>
            </select>
          </div>
          {plan.packageType === "onetime" ? <>

            {/* <div className="w-[100%]">
              <label
                htmlFor="address"
                className="block mb-1 font-semibold text-white text-semibold text-[15px]"
              >
                Package Name *
              </label>
              <input
                type="text"
                name="address"
                placeholder="Eg. Gold Package"
                className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
                value="One time wash"
                disabled
                onChange={(e) => {
                 
                }}
              />
            </div> */}

          </> :
            <>
            
              <div className="w-[100%]">
                <label
                  htmlFor="address"
                  className="block mb-1 font-semibold text-white text-semibold text-[15px]"
                >
                  Package Name *
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Eg. Gold Package"
                  className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
                  onChange={(e) => {
                    setplan({ ...plan, packageName: e.target.value })
                  }}
                />
              </div>
            
            </>
          
          
          }
         

          <div className="w-[100%]">
            <label
              htmlFor="address"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
             {plan.vehicleType== "car" ? "Price Hatchback (Per wash)*" : "Price (Per wash)"} 
            </label>
            <input
              type="number"
              name="address"
              placeholder="Eg. 500"
              className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
              onChange={(e) => {
                setplan({ ...plan, pricehatchback: e.target.value })
              }}
            />
          </div>
          
          {plan.vehicleType== "car" ? (
          <Fragment>
          <div className="w-[100%]">
            <label
              htmlFor="address"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              Price Sedan (Per wash)*
            </label>
            <input
              type="number"
              name="address"
              placeholder="Eg. 500"
              className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
              onChange={(e) => {
                setplan({ ...plan, pricesedan: e.target.value })
              }}
            />
          </div>

          <div className="w-[100%]">
            <label
              htmlFor="address"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              Price Mini SUV (Per wash)*
            </label>
            <input
              type="number"
              name="address"
              placeholder="Eg. 500"
              className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
              onChange={(e) => {
                setplan({ ...plan, priceminisuv: e.target.value })
              }}
            />
          </div>

          <div className="w-[100%]">
            <label
              htmlFor="address"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              Price SUV (Per wash)*
            </label>
            <input
              type="number"
              name="address"
              placeholder="Eg. 500"
              className="w-full text-[14px] px-4 py-[10px] text-black rounded outline-none"
              onChange={(e) => {
                setplan({ ...plan, pricesuv: e.target.value })
              }}
            />
          </div>
          </Fragment>
          ) :""}
          
          <div className="w-full mb-5">
            <label
              htmlFor="address"
              className="block mb-1 font-semibold text-white text-semibold text-[15px]"
            >
              Description *
            </label>
            <textarea
              rows="6"
              placeholder="Please make sure you do thiss...."
              className="rounded-md w-full p-2 text-black"
              maxLength="300"
              onChange={(e) => {
                setplan({ ...plan, desc: e.target.value })
              }}
            ></textarea>
          </div>




        </div>
        {plan.packageType === "onetime" ?
          ("") :
          <>
          
        <div className="w-full mt-3">
          <label
            htmlFor="address"
            className="block mb-1 font-semibold text-white text-semibold text-[15px]"
          >
            Feature 1 *
          </label>
          <div className="flex flex-row">
            <input
              type="text"
              name="address"
              placeholder="Feature Description"
              className="w-full text-[14px] px-4 py-[10px] rounded outline-none"
              maxLength={maxFeatureCharacter}
              onChange={(e) => {
                setplan({ ...plan, fe1: e.target.value })
              }}
            />
          </div>
        </div>
        <div className="w-full mt-4">
          <label
            htmlFor="address"
            className="block mb-1 font-semibold text-white text-semibold text-[15px]"
          >
            Feature 2 *
          </label>
          <div className="flex flex-row">
            <input
              type="text"
              name="address"
              placeholder="Feature Description"
              className="w-full text-[14px] px-4 py-[10px] rounded outline-none"
              maxLength={maxFeatureCharacter}
              onChange={(e) => {
                setplan({ ...plan, fe2: e.target.value })
              }}
            />
          </div>
        </div>
        <div className="w-full mt-4">
          <label
            htmlFor="address"
            className="block mb-1 font-semibold text-white text-semibold text-[15px]"
          >
            Feature 3 *
          </label>
          <div className="flex flex-row">
            <input
              type="text"
              name="address"
              placeholder="Feature Description"
              className="w-full text-[14px] px-4 py-[10px] rounded outline-none"
              maxLength={maxFeatureCharacter}
              onChange={(e) => {
                setplan({ ...plan, fe3: e.target.value })
              }}
            />
          </div>
        </div>
        <div className="w-full mt-4">
          <label
            htmlFor="address"
            className="block mb-1 font-semibold text-white text-semibold text-[15px]"
          >
            Feature 4 *
          </label>
          <div className="flex flex-row">
            <input
              type="text"
              name="address"
              placeholder="Feature Description"
              className="w-full text-[14px] px-4 py-[10px] rounded outline-none"
              maxLength={maxFeatureCharacter}
              onChange={(e) => {
                setplan({ ...plan, fe4: e.target.value })
              }}
            />
          </div>
        </div>
        <div className="w-full mt-4">
          <label
            htmlFor="address"
            className="block mb-1 font-semibold text-white text-semibold text-[15px]"
          >
            Feature 5 *
          </label>
          <div className="flex flex-row">
            <input
              type="text"
              name="address"
              placeholder="Feature Description"
              className="w-full text-[14px] px-4 py-[10px] rounded outline-none"
              maxLength={maxFeatureCharacter}
              onChange={(e) => {
                setplan({ ...plan, fe5: e.target.value })
              }}
            />
          </div>
        </div>
          </>
      
      }

        <div className="bg-[#FFC044] w-[60%] mx-auto rounded-md mt-6">
          <button className="w-full py-[14px] text-black" onClick={() => {
            addPlan(plan)
          }}>Add Plan</button>
        </div>
      </div>
    </div>
  );
};

export default AddPlanModal;