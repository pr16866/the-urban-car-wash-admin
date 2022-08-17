import React, { useEffect, useState,Fragment } from "react";
import { FaChevronDown,FaMapMarkerAlt } from "react-icons/fa";
import BookingModal from "../Modal";
import { useRouter } from "next/router";
import { allOrders } from "../../../utils/api";
import { onetimewash, subscriptionwash,mapButton } from "./index.module.css";
import { modalConfig } from "../../config/model";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
  limitToLast,
  startAfter,
  getDocs,
  endBefore
} from "firebase/firestore";
import { db } from "../../../config/firebase";

function BookingData({ props }) {
  const PAGE_SIZE = 100;
  const [openId, setOpenId] = useState();
  const [isModal, setIsModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  const [modalState, setModalState] = useState("");
  const { page, setPage, btnPreview, setbtnPreview, filteredDAta,count } = props;

  var router = useRouter();
  const [querry, setQuerry] = useState("");

  const toggleDetails = (id) => {
    openId == id ? setOpenId() : setOpenId(id);
  };
  useEffect(() => {
    if (router.query.type) {
      setQuerry(router.query.type);
    }
  }, [router]);

  useEffect(() => {
    if (querry) {
      if(page == 1){
        nextPage();
      }else if (page == 0){
        previousPage()
      }else{
        getOrders()
     }
    }
  }, [querry, page,count]);


  const getOrders = () => {
    const q = query(
      collection(db, querry),
      orderBy("orderNo", "desc"),
      limit(PAGE_SIZE)
    );
    const unsubscribe = onSnapshot(q, (documents) => {
      const tempPosts = [];
      documents.forEach((document) => {
        tempPosts.push({
          id: document.id,
          ...document.data(),
        });
      });
      setOrders(tempPosts);
      setLastVisible(documents.docs[documents.docs.length - 1]);
      setFirstVisible(documents.docs[0]);
    });
    return () => unsubscribe();
  }

  const nextPage = async () => {
    const postsRef = collection(db, querry);
    const q = query(
      postsRef,
      orderBy("orderNo", "desc"),
      startAfter(lastVisible.data().orderNo),
      limit(PAGE_SIZE)
    );
    const documents = await getDocs(q);
    updateState(documents);
  };

  const previousPage = async () => {
    const postsRef = collection(db, querry);
    const q = query(
      postsRef,
      orderBy("orderNo", "desc"),
      endBefore(firstVisible.data().orderNo),
      limitToLast(PAGE_SIZE)
    );
    const documents = await getDocs(q);
    updateState(documents);
  };

  const updateState = (documents) => {
    if (!documents.empty) {
      const tempPosts = [];
      documents.forEach((document) => {
        tempPosts.push({
          id: document.id,
          ...document.data(),
        });
      });
      setOrders(tempPosts);
      setbtnPreview({ ...btnPreview, next: true});
      setbtnPreview({next: true, previous: true})
    } else {
      if(page == 1){
        setbtnPreview({ ...btnPreview, next: false });
      }else{
        setbtnPreview({ ...btnPreview, previous: false });
      }
    }
    if (documents?.docs[0]) {
      setFirstVisible(documents.docs[0]);
    }
    if (documents?.docs[documents.docs.length - 1]) {
      setLastVisible(documents.docs[documents.docs.length - 1]);
    }
  };

  useEffect(() => {
    if (modalState === modalConfig.MODEL_DESTROYED || modalState === modalConfig.MODEL_DONE) {
      setIsModal(false);
    }
  }, [modalState]);

  return (
    <Fragment>
      {orders.map((item, index) => {
        return (
          <tbody key={index}>
            <tr>
              <td className="px-4 py-3 w-max">{item.orderNo}</td>
              <td className="px-4 py-3 w-max">
                {querry === "One_time_wash"
                  ? "One Time Wash"
                  : "Subscription Wash"}
              </td>
              {/* <td className="px-4 py-3 w-max">{item.area}</td> */}
             {/* {querry == "One_time_wash" ? (<td className="px-4 py-3 w-max">{item.timeSlot}</td>) :""} */}
              <td className="px-4 py-3 w-max">₹ {item.totalprice}</td>
              <td className="px-4 py-3 w-max">PAID</td>
              <td className="px-4 py-3 text-gray-900 w-max">
                <button
                  className="px-5 py-1 bg-[#FFC044] rounded-md"
                  onClick={() => {
                    setIsModal(!isModal)
                    setModalState(modalConfig.MODEL_STARTED)
                  }}
                >
                  Assign
                </button>
              </td>
              <td>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex space-x-4 items-center">
                    {item.Status == "unassigned" ?
                    (
                    <div className="w-2 h-2 rounded-full bg-[#FF013E]"></div>
                    ) : "" }
                    <span>{item.Status}</span>
                  </div>
                  <div
                    className="ml-5 p-[2px]"
                    onClick={() => toggleDetails(index)}
                  >
                    <FaChevronDown className="cursor-pointer" />
                  </div>
                </div>
              </td>
            </tr>

            <tr className="border-b border-[#EFEEEB]">
              <td colSpan={5}>
                {openId == index && (
                  <div
                    className={
                      querry === "One_time_wash"
                        ? onetimewash
                        : subscriptionwash
                    }
                  >
                    {/* client Details */}
                    <div className="flex flex-col w-[70%] pr-4">
                      <h1 className="text-[16px] font-bold ">Client Details</h1>
                      <div className="flex flex-row">
                        <div className="flex flex-col">
                          <div className="flex flex-row">
                            <p htmlFor="name" className="mr-9">
                              Phone
                            </p>
                            <span>: {item.phoneNo}</span>
                          </div>
                          <div className="flex flex-row">
                            <p htmlFor="name" className="mr-[26px]">
                              Address
                            </p>
                            <span>:</span>
                            <span className="ml-1">
                              {item.address}
                            </span>
                          </div>
                          <div className="flex flex-row">
                            <p htmlFor="name" className="mr-[10px]">
                              Landmark
                            </p>
                            <span className="ml-1">: {item.landmark}</span>
                          </div>
                          <div className="flex flex-row">
                            <p htmlFor="name" className="mr-6">
                              Pincode
                            </p>
                            <span className="ml-[2px]">: {item.pincode}</span>
                          </div>
                          <div className="flex flex-row">
                            <a  rel="noreferrer" target="_blank" href={`https://maps.google.com/?q=${item.lat},${item.lng}`}><button className={mapButton}>Open on Map</button></a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Wash Details */}
                    {querry === "One_time_wash" ? (
                      <div className="flex flex-col w-[70%]">
                        <h1 className="text-[16px] font-bold mb-1">
                          Wash Details
                        </h1>
                        <div className="flex flex-col">
                          <div className="flex flex-row">
                            <p htmlFor="name" className="mr-7">
                              Assigned
                            </p>
                            <span className="ml-9">
                              : 
                            </span>
                          </div>
                          <div className="flex flex-row">
                            <p className="mr-7">Vehicle No. </p>
                            <span className="ml-[23px]">:</span>
                            <span className="ml-1">{item.vehicleNo}</span>
                          </div>
                          <div className="flex flex-row">
                            <p className="mr-6">Vehicle Type </p>
                            <span className="ml-5">:</span>
                            <span className="ml-1">{item.vehicleType}</span>
                          </div>
                          <div className="flex flex-row">
                            <p className="mr-10">Service </p>
                            <span className="ml-[37px]">:</span>
                            <span className="ml-1">{item.service} </span>
                          </div>
                          <div className="flex flex-row">
                            <p className="mr-6">Time Slot </p>
                            <span className="ml-[39px]">:</span>
                            <span className="ml-1">{item.timeSlot}</span>
                          </div>
                          {item.addOn &&
                            item.addOn.map((data, index) => {
                              return (
                                <div className="flex flex-row" key={index}>
                                  <p className="mr-9">Add On Price</p>
                                  <span className="ml-9">:</span>
                                  <span className="ml-1">₹{data.price}</span>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    ) : (
                      <>
                        {item[0] && (
                          <>
                            <h1 className="text-[16px] font-bold mb-1 mt-4">
                              Wash Details
                            </h1>
                            {item[0].map((item, index) => {
                              return (
                                <div
                                className="flex flex-col w-[70%] mt-2"
                                key={index}
                                >
                                  <h1>#{index + 1}</h1>
                                 <div className="flex flex-col">
                                    <div className="flex flex-row">
                                      <p htmlFor="name" className="mr-7 text-bold">
                                        Assigned
                                      </p>
                                      <span className="ml-9">
                                        : 
                                      </span>
                                    </div>
                                    <div className="flex flex-row">
                                      <p className="mr-7 text-bold">Vehicle No. </p>
                                      <span className="ml-[23px]">:</span>
                                      <span className="ml-1">
                                        {item.vehicleNo}
                                      </span>
                                    </div>
                                    <div className="flex flex-row">
                                      <p className="mr-6 text-bold">Vehicle Type </p>
                                      <span className="ml-5">:</span>
                                      <span className="ml-1">
                                        {item.vehicleType}
                                      </span>
                                    </div>
                                    <div className="flex flex-row">
                                      <p className="mr-10 text-bold">Service </p>
                                      <span className="ml-[37px]">:</span>
                                      <span className="ml-1">
                                        {item.service}{" "}
                                      </span>
                                    </div>
                                    <div className="flex flex-row">
                                      <p className="mr-6 text-bold">Time Slot </p>
                                      <span className="ml-[39px]">:</span>
                                      <span className="ml-1">
                                        {item.timeSlot}
                                      </span>
                                    </div>
                                    <div className="flex flex-row">
                                      <p className="mr-6 text-bold">Months</p>
                                      <span className="ml-[50px]">:</span>
                                      <span className="ml-1">{item.months} months</span>
                                    </div>
                                    <div className="flex flex-row">
                                      <p className="text-bold">Wash Per Month</p>
                                      <span className="ml-[15px]">:</span>
                                      <span className="ml-1">{item.washTime} wash p/m</span>
                                    </div>
                                    <p className="mr-9 text-bold">Addons: </p>
                                    {item.addOn.map((data, index) => {
                                      return (
                                        <>
                                        <div key={index}>
                                        <div
                                          className="flex flex-row"
                                        >
                                          <p className="ml-1">{data.selected} ₹({data.price}),</p>
                                        </div>
                                        </div>
                                        </>
                                      );
                                    })}
                                  </div>
                                  <hr />
                                </div>
                              );
                            })}
                          </>
                        )}
                      </>
                    )}
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        );
      })}
      {isModal && (
        <div className="absolute flex justify-center items-center inset-0  z-50 outline-none focus:outline-none backdrop-blur-sm">
          <BookingModal props={{ modalState, setModalState }} />
        </div>
      )}
    </Fragment>
  );
}

export default BookingData;
