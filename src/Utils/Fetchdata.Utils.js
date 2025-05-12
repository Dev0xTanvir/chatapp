import {
  getDatabase,
  ref,
  onValue,
  off,
  set,
  push,
  remove,
} from "firebase/database";

const db = getDatabase();

export const fetchdata = async (dbname = "grouplist") => {
  try {
    const starCountRef = ref(db, dbname);
    let customblankarr = [];
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((element) => {
        customblankarr.push({
          ...element.val(),
          [`${dbname} key`]: element.key,
        });
      });
      console.log(customblankarr);
    });
  } catch (error) {
    throw new Error(`Faield to fetch data from ${dbname} database`);
  }
};
