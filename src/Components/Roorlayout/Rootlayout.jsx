import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router";
import { getAuth } from "firebase/auth";
import Usernotverified from "../../Pages/Error/Usernotverified";

const Rootlayout = () => {
  let auth = getAuth();
  let [userverified, setuserverified] = useState([false]);
  console.log(auth);
  useEffect(() => {
    if (auth?.currentUser?.emailVerified) {
      setuserverified(auth?.currentUser?.emailVerified || true);
    } else {
      setuserverified(auth?.currentUser?.emailVerified || false);
    }
  }, []);
  let content = null;
  if (userverified) {
    content = (
    <div className="p-5 flex gap-[30px] ">
      <div>
        <Sidebar />
      </div>
      <div className="w-full h-[100dvh] rounded-3xl ">
        <Outlet />
      </div>
    </div> );
  } else {
    content = (
      <Usernotverified/>
    )
  }

  return  (
    <>
    {content}
    </>
    ) ;
};

export default Rootlayout;
