import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import homeimg from "../../assets/Home1.png";
const Group = () => {
  let [arrayitem, setarrayitem] = useState(10);
  return (
    <div className="px-2">

      {/* group list */}
      <div className="shadow-2xs bg-white-200">
        <div className="flex justify-between items-center mt-2">
          <h1>Groups List</h1>
          <span>
            <BsThreeDotsVertical />
          </span>
        </div>
        <div className="overflow-y-scroll h-[50vh]">
          {[...new Array(arrayitem)].map((_, index) => (
            <div
              className={
                arrayitem - 1 === index
                  ? "flex justify-between items-center mt-3 pb-2"
                  : "flex justify-between items-center mt-3 border-b border-b-gray-700 pb-2"
              }
            >
              <div>
                <picture>
                  <img src={homeimg} alt={homeimg} />
                </picture>
              </div>
              <div className="py-3">
                <h1 className="font-popince font-semibold text-[18px]">
                  Friends Reunion
                </h1>
                <p className="font-popince font-medium text-[14px]">
                  Hi Guys, Wassup!
                </p>
              </div>
              <button>
                <button
                  type="button"
                  class="focus:outline-none text-white bg-purple-700  font-medium rounded-lg text-sm px-5 py-2.5 mb-2  cursor-pointer"
                >
                  Join
                </button>
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* group list */}
    </div>
  );
};

export default Group;

