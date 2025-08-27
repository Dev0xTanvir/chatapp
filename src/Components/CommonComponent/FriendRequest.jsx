import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import homeimg from "../../assets/Home1.png";
import {
  getDatabase,
  ref,
  onValue,
  off,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
import lib from "../../lib/lib";
const FriendRequest = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [request, setrequest] = useState([]);
  const [loading, setloading] = useState(false);
  const [arrayitem, setarrayitem] = useState(10);

  useEffect(() => {
    setloading(true);
    const usersRef = ref(db, "friendrequest");
    onValue(usersRef, (snapshot) => {
      const requestBlankarr = [];
      snapshot.forEach((fruser) => {
        if (auth?.currentUser?.uid !== fruser?.val()?.whosendfriendrequestuid) {
          requestBlankarr.push({ ...fruser.val(), fruserkey: fruser.key });
        }
      });
      setrequest(requestBlankarr);
      setloading(false);
    });

    // Clean up listener
    return () => {
      off(usersRef);
    };
  }, [auth.currentUser?.uid]);

  // accpect friendrequest function

  const handleaccpetrequest = (acrequest) => {
    set(push(ref(db, "friend")), {
      ...acrequest,
      createdAt: lib.gettimenow(),
    })
      .then(() => {
        // remove friendrequest id
        const frrequest = ref(db, `friendrequest/${acrequest.fruserkey}`);
        remove(frrequest);
      })
      .then(() => {
        set(push(ref(db, "notification/")), {
          notificationMsg: `${
            acrequest?.whorecivedfriendrequestname ||
            auth?.currentUser?.displayName
          } accpect friend request`,
          createdAt: lib.gettimenow(),
        });
      })
      .then(() => {
        lib.successtost(
          `${
            acrequest?.whorecivedfriendrequestname ||
            auth?.currentUser?.displayName
          } accpect friend request`,
          "top-center"
        );
      })
      .catch((err) => {
        console.error("Error send accpetrequest", err);
      });
  };

  // remove friendrequest

  const handlereject = (fr) => {
    const areyousure = confirm;
    if (areyousure) {
      // remove friendrequest id
      const frrequest = ref(db, `friendrequest/${fr.fruserkey}`);
      remove(frrequest);
    }
  };

  return (
    <div className="px-2">
      {/* friendrequest list */}
      <div className="shadow-2xs bg-white-200">
        <div className="flex justify-between items-center mt-2">
          <h1>Friend Request</h1>
          <span>
            <BsThreeDotsVertical />
          </span>
        </div>
        <div className="overflow-y-scroll h-[50vh]">
          {request?.map((fr, index) => (
            <div
              className={
                arrayitem - 1 === index
                  ? "flex justify-between items-center mt-3 pb-2"
                  : "flex justify-between items-center mt-3 border-b border-b-gray-700 pb-2"
              }
            >
              <div>
                <picture>
                  <img
                    src={fr.whosendfriendrequestprofile_picture || homeimg}
                    alt={homeimg}
                  />
                </picture>
              </div>
              <div className="py-3">
                <h1 className="font-popince font-semibold text-[18px]">
                  {fr.whosendfriendrequestname}
                </h1>
                <p className="font-popince font-medium text-[14px]">
                  {moment(fr.createdAt).fromNow()}
                </p>
              </div>
              <div>
                <button>
                  <button
                    onClick={() => handleaccpetrequest(fr)}
                    type="button"
                    class="focus:outline-none text-white bg-purple-700  font-medium rounded-lg text-sm px-5 py-2.5 mb-2  cursor-pointer"
                  >
                    Accept
                  </button>
                </button>
                <button>
                  <button
                    onClick={() => handlereject(fr)}
                    type="button"
                    class="focus:outline-none text-white bg-red-700  font-medium rounded-lg text-sm px-5 py-2.5 mb-2  cursor-pointer"
                  >
                    Remove
                  </button>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* friendrequest list */}
    </div>
  );
};

export default FriendRequest;
