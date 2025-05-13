import {
  getDatabase,
  ref,
  get,
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
    let snapshot = await get(starCountRef);
    const customblankarr = [];
    if (snapshot.exists()) {
      snapshot.forEach((element) => {
        customblankarr.push({
          ...element.val(),
          [`${dbname} key`]: element.key,
        });
      });
    }
    return customblankarr;
  } catch (error) {
    throw new Error(`Faield to fetch data from ${dbname} database`);
  }
};
