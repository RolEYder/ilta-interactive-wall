import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
interface IProps {
  urlImage?: string;
  username?: string;
  bio?: string;
}

export default function CardProfile(props: IProps) {
  const [posts, setPosts] = useState(0);
  const CURRENT_USER = getAuth().currentUser;

  function gettingNumberOfPost() {
    const db = getDatabase();
    const reference = ref(db, "posts/");
    let counter = 0;
    onValue(reference, (snapshot) => {
      snapshot.forEach((snap) => {
        if (snap.val().user === CURRENT_USER?.uid) {
          counter++;
          setPosts(counter);
        }
      });
      console.log(posts);
    });
  }
  useEffect(() => {
    gettingNumberOfPost();
  });

  return (
    <>
      <div className="shadow-lg rounded-2xl  w-80 h-80 justify-center bg-white dark:bg-gray-800">
        <div className="flex flex-col items-center justify-center p-10 ">
          <p className="text-gray-800 dark:text-white text-xl font-medium mt-2">
            {props.username}
          </p>
          <p className="text-gray-400 text-xs mb-4">{props.bio}</p>
          <div className="rounded-lg p-2  mt-4">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-200">
              <p className="flex items-center justify-content flex-col">
                Number of posts
                <span className="text-black dark:text-white font-bold">
                  {posts}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
