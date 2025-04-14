import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import homeimg from "../../assets/Home1.png";
import { CgMathPlus } from "react-icons/cg";
import { getDatabase, ref, onValue } from "firebase/database";
const User = () => {
  
  let [userupdate, setuserupdate] = useState([]);
  let db = getDatabase();
  useEffect(() => {
    let pushuser = [];
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      snapshot.forEach((user) => {
        pushuser.push({ ...user.val(), userkey: user.key });
      });
      setuserupdate(pushuser);
    });
    // Clean up function
    return () => {
      const usersRef = ref(db, "users/");
    };
  }, []);

  return (
    <div className="px-2">
      {/* user list */}
      <div className="shadow-2xs bg-white-200">
        <div className="flex justify-between items-center mt-2">
          <h1>User List</h1>
          <span>
            <BsThreeDotsVertical />
          </span>
        </div>
        <div className="overflow-y-scroll h-[50vh]">
          {userupdate?.map((users, index) => (
            <div
              className={
                userupdate?.length - 1 === index
                  ? "flex justify-between items-center mt-3 pb-2"
                  : "flex justify-between items-center mt-3 border-b border-b-gray-700 pb-2"
              }
            >
              <div>
                <picture>
                  <img src={users.profile_picture || homeimg} alt={users.profile_picture || homeimg} />
                </picture>
              </div>
              <div className="px-3">
                <h1 className="font-popince font-semibold text-[18px] w-[70%] truncate">
                  {users.username || Tanvir}
                </h1>
                <p className="font-popince font-medium text-[14px] w-[70%] truncate">
                  {users?users.email: ' missing'}
                </p>
              </div>
              <button>
                <button
                  type="button"
                  class="focus:outline-none text-white bg-purple-700  font-medium rounded-lg text-sm px-5 py-2.5 mb-2  cursor-pointer"
                >
                  <CgMathPlus />
                </button>
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* user list */}
    </div>
  );
};

export default User;
