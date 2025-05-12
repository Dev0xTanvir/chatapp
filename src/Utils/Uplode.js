import { getDatabase, push, ref, set } from "firebase/database";
const db = getDatabase();
export const Uplodefile = async (body) => {
  try {
    if (!body) return;
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dexercysn/image/upload",
      {
        method: "POST",
        body,
      }
    );

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    throw new Error("cloudinary uplode failed", error);
  }
};

// Uplode firebase database

export const setFirebasedata = async (dbname, data) => {
  try {
    await set(push(ref(db, dbname)), data);
    return true;
  } catch (error) {
    throw new Error("firebase uplode failed", error);
  }
};
