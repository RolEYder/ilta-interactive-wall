import  {
  auth,
  createUserWithEmailAndPassword,
} from "../config/firebaseConfig";
import { getTimeStamp } from "../helpers/helpers";
import bcrypt from "bcryptjs";
import { toast } from "../components/toast/ToastManagement";
import { getDatabase, ref, set } from "firebase/database";

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
      const db = getDatabase();
      set(ref(db, `users/${user.uid}`), {
        uid: user.uid,
        bio: "",
        joined: joined,
       username: username,
        email: email,
        password: hashPassword,
      })
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
