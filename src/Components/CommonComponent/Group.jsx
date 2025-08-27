import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import homeimg from "../../assets/Home1.png";
import { useFetchdata } from "../../Utils/Fetchdata.Utils";
import GroupListError from "../../Errore/GroupListError";
import { useFetch } from "../../Hook/Fetchdata";
import moment from "moment";
const Group = () => {
  let [arrayitem, setarrayitem] = useState(10);

  // fetch data from grouplist

  const Grouplistdata = useFetch("grouplist");

  if (Grouplistdata.data.length == 0) {
    return <GroupListError />;
  }

  return (
    <div className="px-2">
      {/* group list */}
      <div className="shadow-2xs bg-white-200">
        <div className="flex justify-between items-center mt-2">
          <h1>Groups</h1>
          <span>
            <BsThreeDotsVertical />
          </span>
        </div>
        <div className="overflow-y-scroll h-[50vh]">
          {Grouplistdata.data.map((group, index) => (
            <div
              className={
                Grouplistdata.data - 1 === index
                  ? "flex justify-between items-center mt-3 pb-2"
                  : "flex justify-between items-center mt-3 border-b border-b-gray-700 pb-2"
              }
            >
              <div>
                <picture>
                  <img src={group?.groupImg || homeimg} alt={homeimg} />
                </picture>
              </div>
              <div className="py-3">
                <h1 className="font-popince font-semibold text-[18px]">
                  {group?.groupName}
                </h1>
                <p className="font-popince font-medium text-[14px]">
                  {group?.groupTagname}
                </p>
              </div>
              <button className="font-medium font-popince text-[10px]">
                {moment(group.createdAt).fromNow()}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* group list */}
    </div>
  );
};

export default Group;
