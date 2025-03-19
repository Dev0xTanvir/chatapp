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
import { Link, useNavigate } from "react-router";

const Sidebar = () => {
  let navigate = useNavigate();
  let navicon = [
    {
      id: 1,
      path: "/",
      icon: <IoHomeOutline />,
    },
    {
      id: 2,
      path: "/message",
      icon: <BsChatDots />,
    },
    {
      id: 3,
      path: "/notification",
      icon: <FaRegBell />,
    },
    {
      id: 4,
      path: "/setting",
      icon: <IoSettingsOutline />,
    },
    {
      id: 5,
      icon: <CgLogOut />,
    },
  ];

  // handle function implement

  let handlelink = (path = "/") => {
    navigate(path);
  };

  // catch the parms

  return (
    <div>
      <div className=" w-[150px] bg-[#5F35F5] rounded-3xl h-[115dvh]">
        <div className="flex justify-center ">
          <div className="w-[70px] h-[70px] rounded-full relative cursor-pointer group mt-[38px] ">
            <picture>
              <img
                src={sideimg}
                alt={sideimg}
                className="w-full h-full rounded-full"
              />
            </picture>
            <span className=" absolute hidden group-hover:block top-[25%] left-[25%] translate-[-25%, -25%] bg-[#DB0505] text-white text-[30px] ">
              <IoCloudUploadOutline />
            </span>
          </div>
        </div>
        {/* {navigation icon} */}

        <div className="flex flex-col gap-y-14 items-center mt-[78px] cursor-pointer">
          {navicon?.map((item, index) =>
            navicon.length - 1 == index ? (
              <div
                className={
                  location.pathname == item.path
                    ? "text-[45px] mt-5 active text-white cursor-pointer"
                    : "text-[45px] mt-5 text-white cursor-pointer"
                }
                key={item.id}
                onClick={() => handlelink(item.path)}
              >
                {item.icon}
              </div>
            ) : (
              <div
              className={
                location.pathname == item.path
                  ? "text-[45px] mt-5 active text-white cursor-pointer"
                  : "text-[45px] mt-5  text-white cursor-pointer"
              }
                key={item.id}
                onClick={() => handlelink(item.path)}
              >
                {item.icon}
              </div>
            )
          )}
        </div>

        {/* {navigation icon} */}
      </div>
    </div>
  );
};

export default Sidebar;
