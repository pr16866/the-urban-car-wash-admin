import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/router";
import BookingData from "./BookingData";
import { getFilterText } from "../../utils/api";

const BookingMain = () => {
  const [page, setPage] = useState(null);
  const [btnPreview, setbtnPreview] = useState({
    next: true,
    previous: true,
  });
  const [filterText, setFilterText] = useState("");
  const [filteredDAta, setFilteredDAta] = useState([]);
  const [count, setCount] = useState(0)
  var router = useRouter();
  const [querry, setQuerry] = useState("");

  useEffect(() => {
    if (page === 0) {
      setbtnPreview({ ...btnPreview, previous: false, next: true });
    } else {
      setbtnPreview({ ...btnPreview, previous: true });
    }
  }, [page]);

  useEffect(() => {
    if (router.query.type) {
      setQuerry(router.query.type);
    }
  }, [router]);

  useEffect(() => {}, [querry]);

  const filterbyText = async () => {
    if (filterText) {
      const res = await getFilterText(filterText, querry);
      setFilteredDAta(res);
    }
  };

  return (
    <>
      <div className="w-90%">
        <h1 className="my-6 text-lg font-bold text-black mb-6">
          {querry == "One_time_wash" ? "One Time Wash " : "Subscription Wash "}
          Bookings
        </h1>
        <div className="flex flex-row space-x-6 mb-6">
          <div className="w-[301px] relative rounded-md ">
            <input
              type="text"
              placeholder="Search by order-id"
              className="px-3 py-[10px] w-full rounded-md text-black outline-none bg-[#F6F6F6]"
              onChange={(e) => setFilterText(e.target.value)}
            />
            <FiSearch
              className="absolute top-[10px] right-3 w-6 h-6 cursor-pointer"
              onClick={filterbyText}
            />
          </div>
          <select className="bg-[#F6F6F6] px-4 rounded-[6px] h-[35px]">
            <option value="Status">Status</option>
            <option value="Status">Status</option>
            <option value="Status">Status</option>
            <option value="Status">Status</option>
          </select>
          <select className="bg-[#F6F6F6] px-4 rounded-[6px] h-[35px]">
            <option value="Status">Pincode</option>
            <option value="Status">Status</option>
            <option value="Status">Status</option>
            <option value="Status">Status</option>
          </select>
          <select className="bg-[#F6F6F6] px-4 rounded-[6px] h-[35px]">
            <option value="Status">Area</option>
            <option value="Status">Status</option>
            <option value="Status">Status</option>
            <option value="Status">Status</option>
          </select>
          <select className="bg-[#F6F6F6] px-4 rounded-[6px] h-[35px]">
            <option value="Status">8July - 15July</option>
            <option value="Status">Status</option>
            <option value="Status">Status</option>
            <option value="Status">Status</option>
          </select>
        </div>

        <table className="w-full text-left text-[14px] whitespace-no-wrap">
          <thead>
            <tr>
              <th className="px-4 w-[80px] py-3 title-font tracking-wider font-[400] text-gray-900  text-sm rounded-tl rounded-bl">
                Order ID
              </th>
              <th className="px-4 w-[230px] py-3 title-font tracking-wider font-[400] text-gray-900  text-sm">
                Order Type
              </th>
              {/* <th className="px-4 w-[230px] py-3 title-font tracking-wider font-[400] text-gray-900  text-sm">
               Area
              </th> */}
              <th className="px-4 w-[230px] py-3 title-font tracking-wider font-[400] text-gray-900  text-sm">
               Total Price
              </th>
              <th className="px-4 w-[60px] py-3 title-font tracking-wider font-[400] text-gray-900  text-sm">
                Payment
              </th>
              <th className="px-4 w-[120px] py-3 title-font tracking-wider font-[400] text-gray-900  text-sm">
                Assign
              </th>
              <th className="px-4 w-[120px] py-3 title-font tracking-wider font-[400] text-gray-900  text-sm">
                Status
              </th>
              <th className="w-10 title-font tracking-wider font-[400] text-gray-900  text-sm rounded-tr rounded-br"></th>
            </tr>
          </thead>
          <BookingData
            props={{ page, setPage, btnPreview, setbtnPreview, filteredDAta, count}}
          />
        </table>
        <span className="button items-center flex justify-center w-[100%] gap-5 my-5 ">
          {btnPreview.previous && (
            <button
              className="px-8 py-1 bg-[#FFC044] rounded-md font-bold"
              onClick={() => {setCount(count+1); setPage(0)}}
            >
              Previous
            </button>
           )} 
          {btnPreview.next && (
            <button
              className="px-8 py-1 bg-[#FFC044] rounded-md font-bold"
              onClick={() =>{setCount(count+1); setPage(1)}}
            >
              Next
            </button>
          )} 
        </span>
      </div>
    </>
  );
};

export default BookingMain;
