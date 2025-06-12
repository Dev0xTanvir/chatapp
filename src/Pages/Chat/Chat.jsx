import React from "react";
import Friend from "../../Components/CommonComponent/Friend";
import smspng from "../../assets/sms.png.png";
import { HiDotsVertical } from "react-icons/hi";
import Grouplist from "../../Components/CommonComponent/Grouplist";
import { FaCameraRetro, FaRegSmileBeam, FaTelegramPlane } from "react-icons/fa";
const Chat = () => {
  return (
    <div className="w-full h-[100dvh]">
      <div className="h-full flex">
        <div className="w-[40%] h-full ">
          <div className="mb-5">
            <Grouplist />
          </div>
          <div>
            <Friend />
          </div>
        </div>
        <div className="w-[60%] h-full">
          <div className="flex justify-between items-center m-5 border-b border-gray-200 shadow-2xs">
            <div className="flex items-center gap-[33px]">
              <div>
                <picture>
                  <img src={smspng} alt={smspng} />
                </picture>
              </div>
              <div>
                <h1>Swathi </h1>
                <p>Online</p>
              </div>
            </div>
            <div>
              <samp>
                <HiDotsVertical />
              </samp>
            </div>
          </div>
          {/* chat view */}
          <div className="flex w-full flex-col h-[80vh] overflow-y-scroll">
            {[...new Array(10)].map((_, index) =>
              index % 2 == 0 ? (
                <div className="px-[50px] self-start mt-10">
                  <div className="flex flex-col">
                    <div className="text-center bg-[#F1F1F1] px-6 py-3 rounded-2xl">
                      <h1 className="font-popince font-medium text-[16px]">
                        Hey There !
                      </h1>
                    </div>
                  </div>
                  <span className="font-popince font-medium text-[12px] text-gray-400">
                    Today, 2:01pm
                  </span>
                </div>
              ) : (
                <div className="px-[50px] self-end">
                  <div className="flex flex-col">
                    <div className="text-center bg-[#5F35F5] px-6 py-3 rounded-2xl">
                      <h1 className="font-popince font-medium text-[16px]">
                        Hellow !
                      </h1>
                    </div>
                  </div>
                  <span className="font-popince font-medium text-[12px] text-gray-400">
                    Today, 2:01pm
                  </span>
                </div>
              )
            )}
          </div>
          {/* chat view */}

          {/* chat action */}
          <div className="flex items-center gap-x-5 relative">
            <input
              type="text"
              name="textsender"
              id="textsender"
              placeholder="type msg..."
              className="w-[90%] px-3 py-4 rounded-2xl border"
            />
            <span>
              <FaTelegramPlane className="text-5xl" />
            </span>
          </div>
          <div className="flex gap-x-3 absolute right-[140px] bottom-[-23px]" >
            <span>
              <FaRegSmileBeam className="text-3xl" />
            </span>
            <span>
              <FaCameraRetro className="text-3xl" />
            </span>
          </div>
          {/* chat action */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
