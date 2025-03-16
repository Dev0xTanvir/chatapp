import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import homeimg from "../../assets/Home1.png";
const Input = () => {
  let [arrayitem, setarrayitem] = useState(10);
  return (
    <div className="px-2">
      <div>
        <form class="max-w-md me-auto shadow-2xl bg-white-200">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-800 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-full p-4 ps-10 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              required
            />
            <button
              type="submit"
              class="text-white absolute end-2.5 bottom-2.5 text-[20px] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
            >
              <BsThreeDotsVertical />
            </button>
          </div>
        </form>
      </div>
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
            <div className={
              arrayitem -1 === index
              ?"flex justify-between items-center mt-3 pb-2"
              :"flex justify-between items-center mt-3 border-b border-b-gray-700 pb-2"
            }>
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

export default Input;
