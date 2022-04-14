import { getDatabase, onValue, ref } from "firebase/database";
import { dispatch } from "react-hot-toast/dist/core/store"

const get_explores = () => {
    const db = getDatabase();
    const reference = ref(db, "users/");
    let values: any = [];
    return (dispatch: (arg0: { type: string; payload: any; }) => [Object]) => {
        onValue(reference, (snapshot) => {
            snapshot.forEach((snap) => {
              values.push(snap.val());
            });
            dispatch({type: "GET_EXPLORES", payload: values})
          });
    }
}

export {get_explores}