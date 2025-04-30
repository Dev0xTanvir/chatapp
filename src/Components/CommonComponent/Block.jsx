import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import homeimg from "../../assets/Home1.png";
import { getDatabase, ref, onValue, off, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import lib from "../../lib/lib";
import Alert from "../Alert/Alert";
import moment from "moment";

const Block = () => {
  let [arrayitem, setarrayitem] = useState(10);
  let db = getDatabase();
  let auth = getAuth();
  let [blockrequest, setblockrequest] = useState([]);

  // Fetch Block Data

  useEffect(() => {
    const usersRef = ref(db, "blocklist/");
    onValue(usersRef, (snapshot) => {
      const blockBlankarr = [];
      snapshot.forEach((block) => {
        if (auth?.currentUser?.uid == block?.val()?.whorecivedfriendrequestuid)
          blockBlankarr.push({ ...block?.val(), friendkey: block.key });
      });
      setblockrequest(blockBlankarr);
    });

    // Clean up listener
    return () => {
      off(usersRef);
    };
  }, [auth.currentUser?.uid]);

  return (
    <div className="px-2">
      {/* block list */}
      <div className="shadow-2xs bg-white-200">
        <div className="flex justify-between items-center mt-2">
          <h1>Blocked Users</h1>
          <span>
            <BsThreeDotsVertical />
          </span>
        </div>
        <div className="overflow-y-scroll h-[50vh]">
          {blockrequest.map((blockuser, index) => (
            <div
              key={blockuser.id || blockuser.firebaseKey || index}
              className={
                arrayitem - 1 === index
                  ? "flex justify-between items-center mt-3 pb-2"
                  : "flex justify-between items-center mt-3 border-b border-b-gray-700 pb-2"
              }
            >
              <div>
                <picture>
                  <img
                    src={
                      blockuser?.whosendfriendrequestprofile_picture || homeimg
                    }
                    alt={homeimg}
                  />
                </picture>
              </div>
              <div className="py-3">
                <h1 className="font-popince font-semibold text-[18px]">
                  {blockuser?.whosendfriendrequestname || Tanvir}
                </h1>
                <p className="font-popince font-medium text-[14px]">
                  {moment(blockuser.createdAt).fromNow()}
                </p>
              </div>
              <button>
                <button
                  type="button"
                  class="focus:outline-none text-white bg-purple-700  font-medium rounded-lg text-sm px-5 py-2.5 mb-2  cursor-pointer"
                >
                  unblock
                </button>
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* block list */}
    </div>
  );
};

export default Block;
