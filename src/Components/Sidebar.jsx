import React, { useEffect, useState } from "react";
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
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth } from "firebase/auth";

const Sidebar = () => {
  let db = getDatabase();
  let navigate = useNavigate();
  let auth = getAuth();
  let [userdata, setuserdata] = useState({});
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

  useEffect(() => {
    let script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
    script.acync = true;
    document.body.appendChild(script);
  }, []);

  /**
   * todo: handlepofilepictureuplode function
   * parms: void
   *
   */

  /**
   * fetch data firebase realtime database read & write operatation
   */

  useEffect(() => {
    let fetchdata = () => {
      const usersRef = ref(db, "users/");
      onValue(usersRef, (snapshot) => {
        let obj = {};
        snapshot.forEach((item) => {
          if (auth.currentUser.uid === item.val().userid)
            obj = { ...item.val(), userkey: item.key };
        });
        setuserdata(obj);
      });
    };
    fetchdata();
  }, []);

  let handlepofilepictureuplode = () => {
    if (window.cloudinary) {
      cloudinary.openUploadWidget(
        {
          cloudName: "dexercysn",
          uploadPreset: "Tanvir",
          googleApiKey: "AIzaSyCEpis8a0Od9ZAMF_OQrgaDlKtBFZgoDSU",
          searchBySites: ["all", "cloudinary.com"],
          searchByRights: true,
          sources: [
            "local",
            "url",
            "camera",
            "dropbox",
            "shutterstock",
            "gettyimages",
            "istock",
            "unsplash",
            "image_search",
          ],
        },
        (error, result) => {
          if (error) {
            throw new Error("profile picture uplode error");
          }
          if (result.info.secure_url) {
            update(ref(db, `users/${userdata.userkey}`), {
              profile_picture: result.info.secure_url,
            });
          }
        }
      );
    } else {
      throw new Error("upload failed");
    }
  };

  return (
    <div>
      <div className=" w-[150px] bg-[#5F35F5] rounded-3xl h-[115dvh]">
        <div className="flex justify-center ">
          <div className="w-[70px] h-[70px] rounded-full relative cursor-pointer group mt-[38px] ">
            <picture>
              <img
                src={userdata?.profile_picture || sideimg}
                alt={userdata?.profile_picture || sideimg}
                className="w-full h-full rounded-full"
              />
            </picture>
            <span
              onClick={handlepofilepictureuplode}
              className=" absolute hidden group-hover:block top-[25%] left-[25%] translate-[-25%, -25%] bg-[#DB0505] text-white text-[30px] "
            >
              <IoCloudUploadOutline />
            </span>
          </div>
        </div>

        <h1 className="flex justify-center font-medium font-nonitw text-white">
          {userdata?.username || "Tanvir"}
        </h1>

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
