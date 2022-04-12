import { getAuth } from "firebase/auth";

let user = getAuth().currentUser;
function getAuthentication() {
  if (user != null) {
    return true;
  } else  return false;
}
export { getAuthentication };
