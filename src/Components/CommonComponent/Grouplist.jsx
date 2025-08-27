import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import homeimg from "../../assets/Home1.png";
import Modal from "react-modal";
import lib from "../../lib/lib";
import { setFirebasedata, Uplodefile } from "../../Utils/Uplode";
import { closeModal, openModal } from "../../Utils/Mudal.Utils";
import { validationFild } from "../../Validation/Validation";
import { handleinput } from "../../Utils/OnchangeHendeler.Utils";
import { getAuth } from "firebase/auth";
import Group from "./Group";


const Grouplist = () => {
  const auth = getAuth();
  const inputuseref = useRef(null)
  const [arrayitem, setarrayitem] = useState(10);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [grouperror, setgrouperror] = useState({});
  const [groupinfo, setgroupinfo] = useState({
    groupName: "",
    groupTagname: "",
    groupImg: "",
  });

  // handlekeydown function implement

  let handlekeydown = () => {
    validationFild(setgrouperror);
  };

  // validate all function implement

  const handlesubmit = async (event) => {
    event.preventDefault();
    const isValid = validationFild(groupinfo, setgrouperror);
    if (!isValid) return;

    const formData = new FormData();
    formData.append("file", groupinfo.groupImg);
    formData.append("upload_preset", "Tanvir");
    formData.append("cloud_name", "dexercysn");

    try {
      setloading(true);
      const Url = Uplodefile(formData);
      setFirebasedata("grouplist/", {
        adminname: auth.currentUser.displayName,
        adminUid: auth.currentUser.uid,
        adminEmail: auth.currentUser.email,
        profile_picture: auth.currentUser.photoURL,
        groupName: groupinfo.groupName,
        groupTagname: groupinfo.groupTagname,
        groupImg: Url,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setloading(false);
      setgroupinfo({
        groupName: "",
        groupTagname: "",
        groupImg: "",
      });
      closeModal(setIsOpen);
      if (inputuseref.current) {
        inputuseref.current.value = null;
      };
    };
  };

  // fetch data from group list

  

  return (
    <div className="px-2">
      <div>
        <form className="max-w-md me-auto shadow-2xl bg-white-200">
          <label
            for="default-search"
            className="mb-2 text-sm font-medium text-gray-800 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
              className="block w-full p-4 ps-10 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 text-[20px] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
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
            <button
              type="button"
              onClick={() => openModal(setIsOpen)}
              className="focus:outline-none text-white bg-purple-700  font-medium rounded-lg text-sm px-5 py-2.5 mb-2  cursor-pointer"
            >
              Create Group
            </button>
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
                  className="focus:outline-none text-white bg-purple-700  font-medium rounded-lg text-sm px-5 py-2.5 mb-2  cursor-pointer"
                >
                  Join
                </button>
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* group list */}

      {/* Modal component */}
      <div className="mx-auto">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={lib.customStyles}
        >
          <button
            type="button"
            onClick={() => closeModal(setIsOpen)}
            className="focus:outline-none cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            X
          </button>

          <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <form
              className="max-w-sm mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="mb-5">
                <label
                  for="Group name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Group name
                </label>
                <input
                  type="text"
                  value={groupinfo.groupName}
                  onKeyDown={handlekeydown}
                  onChange={(event) =>
                    handleinput(event, groupinfo, validationFild, setgroupinfo)
                  }
                  id="groupName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Group name"
                  required
                />

                {grouperror.groupNameerror && (
                  <span className="text-red-500 my-2">
                    {grouperror.groupNameerror}
                  </span>
                )}
              </div>
              <div className="mb-5">
                <label
                  for="groupTagname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Group Tag Name
                </label>
                <input
                  type="text"
                  value={groupinfo.groupTagname}
                  onKeyDown={handlekeydown}
                  onChange={(event) =>
                    handleinput(event, groupinfo, validationFild, setgroupinfo)
                  }
                  id="groupTagname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                {grouperror.groupTagnameerror && (
                  <span className="text-red-500 my-2">
                    {grouperror.groupTagnameerror}
                  </span>
                )}
              </div>
              <div className="flex items-start mb-5"></div>

              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="user_avatar"
                >
                  Upload file
                </label>
                <input
                  className="block w-full text-sm py-2 mb-3 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="groupImg"
                  ref={inputuseref}
                  onKeyDown={handlekeydown}
                  onChange={(event) =>
                    handleinput(event, groupinfo, validationFild, setgroupinfo)
                  }
                  type="file"
                />
                {grouperror.groupImgerror && (
                  <span className="text-red-500 my-2">
                    {grouperror.groupImgerror}
                  </span>
                )}
              </div>
              {loading ? (
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
                >
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handlesubmit}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
                >
                  Submit
                </button>
              )}
            </form>
          </div>
        </Modal>
      </div>
      {/* Modal component */}
    </div>
  );
};

export default Grouplist;
