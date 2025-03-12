import React from "react";
import sideimg from "../assets/sideber.png.png";
import {
  IoCloudUploadOutline,
  IoHomeOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { BsChatDots } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
const Sidebar = () => {
  let navicon = [
    {
      id: 1,
      icon: <IoHomeOutline />,
    },
    {
      id: 2,
      icon: <BsChatDots />,
    },
    {
      id: 3,
      icon: <FaRegBell />,
    },
    {
      id: 4,
      icon: <IoSettingsOutline />,
    },
    {
      id: 5,
      icon: <CgLogOut />,
    },
  ];

  return (
    <div>
      <div className=" w-[10%] bg-[#5F35F5] h-[93vh] rounded-2xl">
        <div className="flex justify-center">
          <div className="w-[70px] h-[70px] rounded-full relative cursor-pointer group mt-[38px]">
            <picture>
              <img
                src={sideimg}
                alt={sideimg}
                className="w-full h-full rounded-full"
              />
            </picture>
            <span className=" absolute hidden group-hover:block top-[25%] left-[25%] translate-[-25%, -25%] text-white text-[30px] ">
              <IoCloudUploadOutline />
            </span>
          </div>
        </div>
        {/* {navigation icon} */}

        <div className="flex flex-col gap-y-14 items-center mt-[78px]">
          {navicon?.map((item, index) =>
            navicon.length - 1 == index ? (
              <span className="text-[45px] mt-5 text-white" key={item.id}>
                {item.icon}
              </span>
            ) : (
              <span className="text-[45px] text-white" key={item.id}>
                {item.icon}
              </span>
            )
          )}
        </div>

        {/* {navigation icon} */}
      </div>
    </div>
  );
};

export default Sidebar;
