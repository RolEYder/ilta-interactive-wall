import { getAuth } from "firebase/auth";

let user = getAuth().currentUser;
console.log(user)
function isAuthenticated() {
  if (user != null) {
    let userData = {
      name: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      uid: user.uid,
    };
    console.log(user)
    return true;
  } else  return null;
}
export { isAuthenticated };
