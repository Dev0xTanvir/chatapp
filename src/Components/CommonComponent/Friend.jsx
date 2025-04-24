import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import homeimg from "../../assets/Home1.png";
import { getDatabase, ref, onValue, off, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
import lib from "../../lib/lib";
import Alert from "../Alert/Alert";
const Friend = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [request, setrequest] = useState([]);
  const [loading, setloading] = useState(false);
  let [arrayitem, setarrayitem] = useState(10);

  useEffect(() => {
    setloading(true);
    const usersRef = ref(db, "friend");
    onValue(usersRef, (snapshot) => {
      const friendBlankarr = [];
      snapshot.forEach((friend) => {
        if(auth?.currentUser?.uid == friend?.val()?.whorecivedfriendrequestuid)
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
                <button className="font-popince font-medium text-[10px]">
                  {moment(fr.createdAt).fromNow()}
                </button>
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
