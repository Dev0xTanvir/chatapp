import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import homeimg from "../../assets/Home1.png";
import { getDatabase, ref, onValue, off, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
const FriendRequest = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [request, setrequest] = useState([]);
  const [loading, setloading] = useState(false);
  let [arrayitem, setarrayitem] = useState(10);

  useEffect(() => {
    setloading(true);
    const usersRef = ref(db, "friendrequest");
    onValue(usersRef, (snapshot) => {
      const requestBlankarr = [];
      snapshot.forEach((fruser) => {
        requestBlankarr.push({...fruser.val(), fruserkey: fruser.key})
      });
      setrequest(requestBlankarr);
      setloading(false);
    });
    
    // Clean up listener
    return () => {
      off(usersRef);
    };
  }, [auth.currentUser?.uid]);

  console.log(request);
  
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
                  Raghav
                </h1>
                <p className="font-popince font-medium text-[14px]">Dinner?</p>
              </div>
              <button>
                <button
                  type="button"
                  class="focus:outline-none text-white bg-purple-700  font-medium rounded-lg text-sm px-5 py-2.5 mb-2  cursor-pointer"
                >
                  Accept
                </button>
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* friendrequest list */}
    </div>
  );
};

export default FriendRequest;
