import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import homeimg from "../../assets/Home1.png";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { getDatabase, ref, onValue, off, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import lib from "../../lib/lib";

const User = () => {
  const [userupdate, setuserupdate] = useState([]);
  const [login, setuserlogin] = useState({});
  const [loading, setloading] = useState(false);
  const [frrequest, setfrrequest] = useState([]);
  const [frindlist, setfrindlist] = useState([]);
  const db = getDatabase();
  const auth = getAuth();

  useEffect(() => {
    setloading(true);
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      const pushuser = [];
      snapshot.forEach((user) => {
        if (auth.currentUser?.uid === user.val().userid) {
          pushuser.push({ ...user.val(), userkey: user.key });
        } else {
          setuserlogin({ ...user.val(), userkey: user.key });
        }
      });
      setuserupdate(pushuser);
      setloading(false);
    });

    // Clean up listener
    return () => {
      off(usersRef);
    };
  }, [auth.currentUser?.uid]);

  // Fetch data from friendrequest

  useEffect(() => {
    setloading(true);
    const usersRef = ref(db, "friendrequest");
    onValue(usersRef, (snapshot) => {
      const sfpushuser = [];
      snapshot.forEach((fruser) => {
        if (auth.currentUser.uid == fruser.val().whosendfriendrequestuid)
          sfpushuser.push(
            auth?.currentUser?.uid?.concat(
              fruser?.val()?.whorecivedfriendrequestuid
            )
          );
      });
      setfrrequest(sfpushuser);
    });

    // Clean up listener
    return () => {
      off(usersRef);
    };
  }, [auth.currentUser?.uid]);

  // Fetch data from friend

  useEffect(() => {
    setloading(true);
    const usersRef = ref(db, "friend");
    onValue(usersRef, (snapshot) => {
      const sfpushuser = [];
      snapshot.forEach((friend) => {
        if (auth.currentUser.uid == friend.val().whosendfriendrequestuid)
          sfpushuser.push(
            friend?.val()?.whorecivedfriendrequestuid?.concat(
              auth?.currentUser?.uid
            )
          );
      });
      setfrindlist(sfpushuser);
    });

    // Clean up listener
    return () => {
      off(usersRef);
    };
  }, [auth.currentUser?.uid]);

  // user friendrequest function

  let handlefriendrequest = (users) => {
    set(push(ref(db, "friendrequest/")), {
      whosendfriendrequestname:
        login?.username || auth?.currentUser?.displayName,
      whosendfriendrequestuid: login?.userid || auth?.currentUser?.uid,
      whosendfriendrequestemail: login?.email || auth?.currentUser?.email,
      whosendfriendrequestprofile_picture:
        login?.profile_picture || auth?.currentUser?.photoURL,
      whosendfriendrequestuserkey: login?.userkey || "",
      whorecivedfriendrequestname: users?.username || "",
      whorecivedfriendrequestuid: users?.userid || "",
      whorecivedfriendrequestemail: users?.email || "",
      whorecivedfriendrequestprofile_picture: users?.profile_picture || "",
      whorecivedfriendrequestuserkey: users?.userkey || "",
      createdAt: lib.gettimenow(),
    })
      .then(() => {
        set(push(ref(db, "friendrequest/")), {
          notificationMsg: `${
            login?.username || auth?.currentUser?.displayName
          } Send a friendrequest ${users?.username}`,
          createdAt: lib.gettimenow(),
        });
      })
      .then(() => {
        lib.successtost(
          `${
            login?.username || auth?.currentUser?.displayName
          } Friendrequest Successfully Done ${users?.username}`,
          "top-center"
        );
      })
      // .then(() => {
      //   let sendidreceivedid = {
      //     id: login?.userid + users?.userid,
      //   };
      //   localStorage.setItem(
      //     "sendfriendrequest",
      //     JSON.stringify(sendidreceivedid)
      //   );
      // })
      .catch((err) => {
        console.error("Error send friendrequest", err);
      });
  };

  // get data from local storage

  // let sendid = localStorage.getItem("sendfriendrequest");
  // let receivedid = JSON.parse(sendid);

  return (
    <div className="px-2">
      <div className="shadow-2xs bg-white-200">
        {loading ? (
          <>
            <div className="flex justify-between items-center mt-2 animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-32"></div>
              <div className="h-4 bg-gray-300 rounded w-6"></div>
            </div>
            <div className="overflow-y-scroll h-[50vh]">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center mt-3 pb-2 animate-pulse ${
                    index !== 4 ? "border-b border-b-gray-300" : ""
                  }`}
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  </div>
                  <div className="px-3 flex-1">
                    <div className="h-4 bg-gray-300 rounded w-[70%] mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-[50%]"></div>
                  </div>
                  <div>
                    <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mt-2">
              <h1>User List</h1>
              <span>
                <BsThreeDotsVertical />
              </span>
            </div>
            <div className="overflow-y-scroll h-[50vh]">
              {userupdate.map((users, index) => (
                <div
                  key={users.userkey}
                  className={`flex justify-between items-center mt-3 pb-2 ${
                    userupdate.length - 1 !== index
                      ? "border-b border-b-gray-700"
                      : ""
                  }`}
                >
                  <div>
                    <picture>
                      <img
                        src={users.profile_picture || homeimg}
                        alt="profile"
                        className="w-10 h-10 rounded-full"
                      />
                    </picture>
                  </div>
                  <div className="px-3">
                    <h1 className="font-popince font-semibold text-[18px] w-[70%] truncate">
                      {users.username || "Tanvir"}
                    </h1>
                    <p className="font-popince font-medium text-[14px] w-[70%] truncate">
                      {users.email || "missing"}
                    </p>
                  </div>
                  {frindlist?.includes(auth?.currentUser?.uid + users?.userid)
                    ? ""
                    : ""}
                  {frrequest?.includes(
                    auth?.currentUser?.uid + users?.userid
                  ) ? (
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-purple-700 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 cursor-pointer"
                    >
                      <CgMathMinus />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handlefriendrequest(users)}
                      className="focus:outline-none text-white bg-purple-700 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 cursor-pointer"
                    >
                      <CgMathPlus />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default User;
