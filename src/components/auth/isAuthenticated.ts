import { getAuth } from "firebase/auth";


function getAuthentication() {
 const session =  sessionStorage.getItem("Auth Token")
  if (session) {
    return true;
  } else  return false;
}

async function IsLogged() {
  getAuth().onAuthStateChanged(user => {
    if (user) {
      console.log(user)
      return true;
    } else {
      return false;
    }
  })
}
export { getAuthentication, IsLogged };
