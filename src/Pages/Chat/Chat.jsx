import React, { useEffect, useRef, useState } from "react";
import Friend from "../../Components/CommonComponent/Friend";

import { HiDotsVertical } from "react-icons/hi";
import Grouplist from "../../Components/CommonComponent/Grouplist";
import { FaCameraRetro, FaRegSmileBeam, FaTelegramPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import liv from "../../lib/lib";
import Modal from "react-modal";

const Chat = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [loading, setloading] = useState(false);
  const [imoji, setimoji] = useState("");
  const [imojiopen, setimojiopen] = useState(false);
  const [allsinglemsg, setallsinglemsg] = useState([]);
  let { value } = useSelector((store) => store.friend);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [sendimage, setsendimage] = useState([]);
  const [imageuplodloding, setimageuplodloding] = useState(false);
  const inputuseref = useRef();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "75%",
      right: "auto",
      bottom: "auto",
      width: "30%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  // handleimageupload

  const handleimageupload = async () => {
    try {
      setimageuplodloding(true);
      // Loop all image uploads with Promise.all
      let allimg = [];
      for (let image of sendimage[0]) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "Tanvir");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dexercysn/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        allimg.push(data.secure_url);
      }

      // set image database
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
        sendmsg: allimg,
      });
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      closeModal(false);
      setimageuplodloding(false);
      if (inputuseref.current) {
        inputuseref.current.value = null;
      }
    }
  };

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
      setsendimage("");
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
                return Array.isArray(msg.sendmsg) ? (
                  <div className="px-[50px] self-end">
                    <div className="flex flex-col">
                      <div className="text-center bg-[#5F35F5] px-6 py-3 rounded-2xl">
                        <h1 className="font-popince font-medium text-[16px]">
                          {msg.sendmsg.map((image) => (
                            <div class="relative me-4">
                              <img
                                class="w-50 h-50 rounded"
                                src={image}
                                alt="profile image"
                              />
                            </div>
                          ))}
                        </h1>
                      </div>
                    </div>
                    <span className="font-popince font-medium text-[12px] text-gray-400">
                      {liv.gettimenow()}
                    </span>
                  </div>
                ) : (
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
                return Array.isArray(msg.sendmsg) ? (
                  <div className="px-[50px] self-start mt-10">
                    <div className="flex flex-col">
                      <div className="text-center bg-[#F1F1F1] px-6 py-3 rounded-2xl">
                        <h1 className="font-popince font-medium text-[16px]">
                          {msg.sendmsg.map((image) => (
                            <div class="relative me-4">
                              <img
                                class="w-50 h-50 rounded"
                                src={image}
                                alt="profile image"
                              />
                            </div>
                          ))}
                        </h1>
                      </div>
                    </div>
                    <span className="font-popince font-medium text-[12px] text-gray-400">
                      {liv.gettimenow()}
                    </span>
                  </div>
                ) : (
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
              <FaRegSmileBeam className="text-3xl cursor-pointer" />
            </span>
            <span>
              <FaCameraRetro
                className="text-3xl cursor-pointer"
                onClick={() => openModal()}
              />
            </span>
          </div>
          {/* chat action */}
        </div>
        <div className=" absolute right-[10%]">
          <EmojiPicker open={imojiopen} onEmojiClick={handleimoji} />
        </div>
      </div>
      {/* modal */}

      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                class="hidden"
                multiple
                ref={inputuseref}
                onChange={(e) => setsendimage([e.target.files])}
              />
            </label>
          </div>
          {/* Button group */}
          <div className="flex justify-center py-7">
            <button
              type="button"
              class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
              onClick={() => closeModal()}
            >
              Cancle
            </button>
            {imageuplodloding ? (
              <button
                type="button"
                class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Upload...
              </button>
            ) : (
              <button
                type="button"
                class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                onClick={handleimageupload}
              >
                Upload
              </button>
            )}
          </div>
          {/* Button group */}
        </Modal>
      </div>
      {/* modal */}
    </div>
  );
};

export default Chat;
