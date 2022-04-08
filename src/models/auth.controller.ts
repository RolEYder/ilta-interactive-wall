import {
  auth,
  db,
  createUserWithEmailAndPassword,
  addDoc,
  collection,
} from "../config/firebaseConfig";
import { getTimeStamp } from "../helpers/helpers";
import bcrypt from "bcryptjs";
import { toast } from "../components/toast/ToastManagement";
const registerWithEmailAndPassword = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const joined = getTimeStamp();
    let hashPassword = "";
    const res = await createUserWithEmailAndPassword(auth, email, password)
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
      return user;
    });
  } catch (err) {
    if (err instanceof Error) {
      toast.show({
        title: "Error 😟. Unable to create the account",
        content: err.message,
        duration: 5000,
      })
        return err.message;
    }
  }
};

export { registerWithEmailAndPassword };
