import { getDatabase, ref, get } from "firebase/database";
import { useEffect, useState } from "react";

// Custom hook: useFetchdata
export const useFetchdata = () => {
  const db = getDatabase();
  const [grouplist, setGrouplist] = useState({
    data: [],
    error: null,
    loading: true,
  });

  useEffect(() => {
    const fetchGroupList = async () => {
      try {
        const starCountRef = ref(db, "grouplist");
        const snapshot = await get(starCountRef);

        if (snapshot.exists()) {
          const customArray = [];
          snapshot.forEach((element) => {
            customArray.push({
              ...element.val(),
              id: element.key,
            });
          });

          setGrouplist({
            data: customArray,
            error: null,
            loading: false,
          });
        } else {
          setGrouplist({
            data: [],
            error: {
              message: "No data found",
              statusCode: 404,
              status: "Failed",
            },
            loading: false,
          });
        }
      } catch (error) {
        setGrouplist({
          data: [],
          error: {
            message: error.message,
            statusCode: 500,
            status: "Error",
          },
          loading: false,
        });
      }
    };

    fetchGroupList();
  }, []);

  return grouplist;
};
