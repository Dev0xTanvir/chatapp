import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import moment from "moment";
import SearchBar from "../../SearchBar/SearchBar";
import NotificationCard from "../../Components/NotificationCard/NotificationCard";
import { getAuth } from "firebase/auth";


const Notifications = () => {
  const [loading, setloading] = useState(false);
  const db = getDatabase();
  const auth = getAuth();
  const [notificationsData, setNotificationsData] = useState([]);

  useEffect(() => {
      setloading(true)
    if (!auth.currentUser) return;

    const notificationsRef = ref(db, 'notification');
    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      const updatedNotifications = [];
      if (snapshot.exists()) {
        snapshot.forEach((childSnap) => {
          updatedNotifications.push({
            id: childSnap.key,
            ...childSnap.val(),
          });
        }); 
      }
      setNotificationsData(updatedNotifications);
      setloading(false)
    });

    return () => unsubscribe();
  }, [auth.currentUser.uid, db]);

  return (
    <div className="flex flex-col justify-between h-full">
      <SearchBar />
      <div className="bg-white shadow-xl rounded-2xl p-5 h-[92%] overflow-scroll">
        {notificationsData?.map((notification, idx) => (
          <div
            key={notification.id || idx}
            className={
              idx < notificationsData.length - 1
                ? "border-b-gray-300 border-b-[1px]"
                : ""
            }
          >
            <NotificationCard
              message={notification.message || notification.notificationMsg}
              time={moment(notification.createdAt).fromNow()}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
