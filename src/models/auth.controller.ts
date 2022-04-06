import {
  auth,
  db,
  createUserWithEmailAndPassword,
  addDoc,
  collection,
} from "../config/firebaseConfig";
import { getTimeStamp } from "../helpers/helpers";
import bcrypt from "bcryptjs";

const registerWithEmailAndPassword = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const joined = getTimeStamp();
    let hashPassword = "";
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    bcrypt.hash(password, 10, (error: Object, hash: any) => {
      hashPassword = hash;
      addDoc(collection(db, "users"), {
        uid: user.uid,
        bio: "",
        joined: joined,
        username,
        email,
        hashPassword,
      });
    });
  } catch (err) {
    console.error(err);
  }
};

export { registerWithEmailAndPassword };
