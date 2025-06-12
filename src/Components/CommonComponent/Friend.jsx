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
import lib from "../../lib/lib";
import Alert from "../Alert/Alert";
import { friendaction } from "../../fetures/slice/friendSlice";
import { useDispatch } from "react-redux";
const Friend = ({ buttonvisible = true }) => {
  let db = getDatabase();
  let auth = getAuth();
  const dispatch = useDispatch();
  let [request, setrequest] = useState([]);
  let [loading, setloading] = useState(false);
  let [arrayitem, setarrayitem] = useState(10);
  let [blockuser, setblockuser] = useState([]);
  let [unblock, setunblock] = useState([]);
  let [unfrand, setunfrand] = useState([]);

  useEffect(() => {
    setloading(true);
    const usersRef = ref(db, "friend");
    onValue(usersRef, (snapshot) => {
      const friendBlankarr = [];
      snapshot.forEach((friend) => {
        if (auth?.currentUser?.uid == friend?.val()?.whorecivedfriendrequestuid)
          friendBlankarr.push({ ...friend?.val(), friendkey: friend.key });
      });
      setrequest(friendBlankarr);
      setloading(false);
    });

    // Clean up listener
    return () => {
      off(usersRef);
    };
  }, [auth.currentUser?.uid]);

  // handleblock function implement

  let handleblock = (frinfo = {}) => {
    // true false ar aupor base kora block
    // setblock((prev) => {
    //   return !prev;
    // })
    set(push(ref(db, "blocklist")), {
      ...frinfo,
      createdAt: lib.gettimenow(),
    }).then(() => {
      // remove friendlist id
      const frRef = ref(db, `friend/${frinfo?.friendkey}`);
      remove(frRef);
    });
  };

  // fetch data from blocklist
  useEffect(() => {
    setloading(true);
    const usersRef = ref(db, "blocklist");
    onValue(usersRef, (snapshot) => {
      const blockpushuser = [];
      snapshot.forEach((bluser) => {
        if (auth.currentUser.uid == bluser.val().whorecivedfriendrequestuid) {
          blockpushuser.push(
            auth?.currentUser?.uid?.concat(
              bluser?.val()?.whosendfriendrequestuid
            )
          );
        }
      });
      setblockuser(blockpushuser);
    });

    // Clean up listener
    return () => {
      off(usersRef);
    };
  }, [auth.currentUser?.uid]);

  // handleunfriend function implement 1

  let handleunfriend = (unfrienduser) => {
    set(push(ref(db, "users")), {
      ...unfrienduser,
      createdAt: lib.gettimenow(),
    })
      .then(() => {
        // remove unblock id
        const frRef = ref(db, `friend/${unfrienduser.friendkey}`);
        remove(frRef);
      })
      .then(() => {
        lib.successtost(
          `You unfriended ${blockuser?.whorecivedfriendrequestname}`,
          "top-center"
        );
      })
      .catch((err) => {
        console.error("Error unfriending", err);
      });
  };

  // fetch data from user

  useEffect(() => {
    const usersRef = ref(db, "users");
    onValue(usersRef, (snapshot) => {
      const userspushuser = [];
      snapshot.forEach((users) => {
        if (auth.currentUser.uid == users.val().whorecivedfriendrequestuid) {
          userspushuser.push(
            auth?.currentUser?.uid?.concat(
              users?.val()?.whosendfriendrequestuid
            )
          );
        }
      });
      setunfrand(userspushuser);
    });

    // Clean up listener
    return () => {
      off(usersRef);
    };
  }, [auth.currentUser?.uid]);

  // Fetch data from unblock

  useEffect(() => {
    setloading(true);
    const usersRef = ref(db, "unblock");
    onValue(usersRef, (snapshot) => {
      const unblockBlankarr = [];
      snapshot.forEach((unblock) => {
        if (
          auth?.currentUser?.uid == unblock?.val()?.whorecivedfriendrequestuid
        )
          unblockBlankarr.push({ ...unblock?.val(), unblockkey: unblock.key });
      });
      setunblock(unblockBlankarr);
      setloading(false);
    });

    // Clean up listener
    return () => {
      off(usersRef);
    };
  }, [auth.currentUser?.uid]);

  // Send msg handeler

  const sendmsg = (friendinfo) => {
    if (auth.currentUser.uid == friendinfo.whorecivedfriendrequestuid) {
      let userinfo = {
        whosendfriendrequestemail: friendinfo.whosendfriendrequestemail,
        whosendfriendrequestname: friendinfo.whosendfriendrequestname,
        whosendfriendrequestprofile_picture:
          friendinfo.whosendfriendrequestprofile_picture,
        whosendfriendrequestuid: friendinfo.whosendfriendrequestuid,
        whosendfriendrequestuserkey: friendinfo.whosendfriendrequestuserkey,
      };
      dispatch(friendaction(userinfo));
    } else {
      let userinfo = {
        whorecivedfriendrequestemail: friendinfo.whorecivedfriendrequestemail,
        whorecivedfriendrequestname: friendinfo.whorecivedfriendrequestname,
        whorecivedfriendrequestprofile_picture:
          friendinfo.whorecivedfriendrequestprofile_picture,
        whorecivedfriendrequestuid: friendinfo.whorecivedfriendrequestuid,
        whorecivedfriendrequestuserkey:
          friendinfo.whorecivedfriendrequestuserkey,
      };
      dispatch(friendaction(userinfo));
    }
  };

  return (
    <div className="px-2">
      {/* friend list */}
      <div className="shadow-2xs bg-white-200">
        <div className="flex justify-between items-center mt-2">
          <h1>Friends</h1>
          <span>
            <BsThreeDotsVertical />
          </span>
        </div>
        <div className="overflow-y-scroll h-[50vh]">
          {request?.length > 0 ? (
            request?.map((fr, index) => (
              <div
                onClick={() => sendmsg(fr)}
                className={
                  arrayitem - 1 === index
                    ? "flex justify-between items-center mt-3 pb-2"
                    : "flex justify-between items-center mt-3 border-b border-b-gray-700 pb-2"
                }
              >
                <div>
                  <picture>
                    <img
                      src={fr?.whosendfriendrequestprofile_picture || homeimg}
                      alt={homeimg}
                    />
                  </picture>
                </div>
                <div className="py-3">
                  <h1 className="font-popince font-semibold text-[18px]">
                    {fr?.whosendfriendrequestname}
                  </h1>
                  <p className="font-popince font-medium text-[14px]">
                    {fr?.whosendfriendrequestemail}
                  </p>
                </div>
                {/* Friend button list */}

                {buttonvisible ? (
                  <div>
                    <button className="font-popince font-medium text-[10px]">
                      {unfrand.includes(
                        auth.currentUser.uid.concat(fr.whosendfriendrequestuid)
                      ) ? (
                        <button
                          type="button"
                          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-pointer"
                        >
                          Unfriend
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleunfriend(fr)}
                          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-pointer"
                        >
                          Unfriend
                        </button>
                      )}
                      {blockuser.includes(
                        auth.currentUser.uid.concat(fr.whosendfriendrequestuid)
                      ) ? (
                        <button
                          type="button"
                          className="focus:outline-none text-white bg-yellow-500 hover:bg-red-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2   cursor-pointer"
                        >
                          Unblocked
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleblock(fr)}
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 cursor-pointer"
                        >
                          Block
                        </button>
                      )}
                    </button>
                  </div>
                ) : (
                  <div> </div>
                )}
              </div>
            ))
          ) : (
            <Alert />
          )}
        </div>
      </div>
      {/* friend list */}
    </div>
  );
};

export default Friend;
