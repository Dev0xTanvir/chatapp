import React, { useEffect, useState } from "react";
import Friend from "../../Components/CommonComponent/Friend";
import smspng from "../../assets/sms.png.png";
import { HiDotsVertical } from "react-icons/hi";
import Grouplist from "../../Components/CommonComponent/Grouplist";
import { FaCameraRetro, FaRegSmileBeam, FaTelegramPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import liv from '../../lib/lib'
import moment from "moment";
const Chat = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [loading, setloading] = useState(false);
  const [imoji, setimoji] = useState("");
  const [imojiopen, setimojiopen] = useState(false);
  const [allsinglemsg, setallsinglemsg] = useState([]);
  let { value } = useSelector((store) => store.friend);

  // imoji set
  const handleimoji = ({ emoji }) => {
    setimoji((prev) => prev + emoji);
  };

  // sendmsg fethdata

  useEffect(() => {
    const sendmsgfetchdata = async () => {
      try {
        const starCountRef = ref(db, "sendmsg");
        onValue(starCountRef, (snapshot) => {
          let msgBlankarr = [];
          snapshot.forEach((msg) => {
            if (
              auth.currentUser.uid == msg.val().whosendfriendrequestuid ||
              auth.currentUser.uid == msg.val().whorecivedfriendrequestuid
            ) {
              msgBlankarr.push({ ...msg.val(), msgkey: msg.key });
            }
          });
          setallsinglemsg(msgBlankarr);
        });
      } catch (error) {
        console.error("error msg fetchdata", error);
      }
    };
    sendmsgfetchdata();
  }, []);

  // msg sent

  const handelsendmsg = async () => {
    setloading(true);
    try {
      await set(push(ref(db, "sendmsg")), {
        whosendfriendrequestemail: auth.currentUser.email,
        whosendfriendrequestname: auth.currentUser.displayName,
        whosendfriendrequestprofile_picture: auth.currentUser.photoURL,
        whosendfriendrequestuid: auth.currentUser.uid,

        whorecivedfriendrequestemail: value.whosendfriendrequestemail,
        whorecivedfriendrequestname: value.whosendfriendrequestname,
        whorecivedfriendrequestprofile_picture:
          value.whosendfriendrequestprofile_picture,
        whorecivedfriendrequestuid: value.whosendfriendrequestuid,
        sendmsg: imoji,
      });
    } catch (error) {
      console.error("handelsendmsg send error", error);
    } finally {
      setloading(false);
      setimojiopen(false);
      setimoji("");
    }
  };

  return (
    <div className="w-full h-[100dvh]">
      <div className="h-full flex">
        <div className="w-[40%] h-full ">
          <div className="mb-5">
            <Grouplist />
          </div>
          <div>
            <Friend buttonvisible={false} />
          </div>
        </div>
        <div className="w-[60%] h-full">
          <div className="flex justify-between items-center m-5 border-b border-gray-200 shadow-2xs">
            <div className="flex items-center gap-[33px]">
              <div>
                <picture>
                  <img
                    src={value.whosendfriendrequestprofile_picture}
                    alt={value.whosendfriendrequestprofile_picture}
                  />
                </picture>
              </div>
              <div>
                <h1 className="font-popince font-semibold text-[24px] text-[#000000]">
                  {value.whosendfriendrequestname}
                </h1>
                {navigator.onLine && (
                  <span className="font-popince font-normal text-[14px] text-[#000000]">
                    Online
                  </span>
                )}
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
            {allsinglemsg.map((msg) => {
              if (
                auth.currentUser.uid == msg.whosendfriendrequestuid &&
                value.whosendfriendrequestuid == msg.whorecivedfriendrequestuid
              ) {
                return (
                  <div className="px-[50px] self-end">
                    <div className="flex flex-col">
                      <div className="text-center bg-[#5F35F5] px-6 py-3 rounded-2xl">
                        <h1 className="font-popince font-medium text-[16px]">
                          {msg.sendmsg}
                        </h1>
                      </div>
                    </div>
                    <span className="font-popince font-medium text-[12px] text-gray-400">
                      {liv.gettimenow()}
                    </span>
                  </div>
                );
              } else if (
                auth.currentUser.uid == msg.whorecivedfriendrequestuid &&
                value.whosendfriendrequestuid == msg.whosendfriendrequestuid
              ) {
                return (
                  <div className="px-[50px] self-start mt-10">
                    <div className="flex flex-col">
                      <div className="text-center bg-[#F1F1F1] px-6 py-3 rounded-2xl">
                        <h1 className="font-popince font-medium text-[16px]">
                          {msg.sendmsg}
                        </h1>
                      </div>
                    </div>
                    <span className="font-popince font-medium text-[12px] text-gray-400">
                      {liv.gettimenow()}
                    </span>
                  </div>
                );
              } 

                return null;
              
            })}
          </div>
          {/* chat view */}

          {/* chat action */}
          <div className="flex items-center gap-x-5 relative">
            <input
              onChange={(e) => setimoji(e.target.value)}
              type="text"
              value={imoji}
              name="textsender"
              id="textsender"
              placeholder="type msg..."
              className="w-[90%] px-3 py-4 rounded-2xl border"
            />
            {loading ? (
              <span>
                <FaTelegramPlane className="text-5xl animate-spin" />
              </span>
            ) : (
              <span onClick={handelsendmsg}>
                <FaTelegramPlane className="text-5xl" />
              </span>
            )}
          </div>
          <div className="flex gap-x-3 absolute right-[140px] bottom-[-35px]">
            <span onClick={() => setimojiopen(!imojiopen)}>
              <FaRegSmileBeam className="text-3xl" />
            </span>
            <span>
              <FaCameraRetro className="text-3xl" />
            </span>
          </div>
          {/* chat action */}
        </div>
        <div className=" absolute right-[10%]">
          <EmojiPicker open={imojiopen} onEmojiClick={handleimoji} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
