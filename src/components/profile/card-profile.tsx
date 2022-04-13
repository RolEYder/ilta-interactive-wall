import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
interface IProps {
  urlImage?: string;
  username?: string;
}

export default function CardProfile(props: IProps) {
  const [posts, setPosts] = useState(0);
  const [follow, setFollow] = useState(0);
  const [following, setFollowing] = useState(0);
  const CURRENT_USER = getAuth().currentUser;

  useEffect(() => {
    const db = getDatabase();
    const reference = ref(db, "posts/");
    let counter = 0;
    onValue(reference, (snapshot) => {
      snapshot.forEach((snap) => {
      if(snap.val().user === CURRENT_USER?.uid) {
        counter++; 
        setPosts(counter)
      }
      console.log(snap.val().user)
      });
    });
  }, [CURRENT_USER?.uid]);
  
  return (
    <>
      <div className="shadow-lg rounded-2xl  w-80 h-80 justify-center bg-white dark:bg-gray-800">
        <img
          alt="profil"
          src="https://www.tailwind-kit.com/images/landscape/1.jpg"
          className="rounded-t-lg h-28 w-full mb-4"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="block relative">
            <img
              alt="profil"
              src={props.urlImage}
              className="mx-auto object-cover rounded-full h-16 w-16  border-2 border-white dark:border-gray-800"
            />
          </a>
          <p className="text-gray-800 dark:text-white text-xl font-medium mt-2">
            {props.username}
          </p>
          <p className="text-gray-400 text-xs mb-4">Software Developer</p>
          <div className="rounded-lg p-2 w-full mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-200">
              <p className="flex flex-col">
                Posts
                <span className="text-black dark:text-white font-bold">{posts}</span>
              </p>
              <p className="flex flex-col">
                Followers
                <span className="text-black dark:text-white font-bold">
                  455
                </span>
              </p>
              <p className="flex flex-col">
                Following
                <span className="text-black dark:text-white font-bold">
                  9.3
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
