import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, update } from "firebase/database";
import Header from "../components/partials/Header";
import CardProfile from "../components/profile/card-profile";
import {
  getDownloadURL,
  getStorage,
  ref as storageReference,
  uploadBytesResumable,
} from "firebase/storage";
import "firebase/compat/storage";

export default function Profile() {
  const [user, setUser] = useState({
    username: "",
  });
  const [bio, setBio] = useState({
    bio: "",
  });
  const [photo, setPhoto] = useState({
    photo: new Blob(),
  });
  const [urlPhoto, setUrlPhoto] = useState({
    urlPhoto: "",
  });

  function onSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    const CURRENT_USER = getAuth().currentUser;
    e.preventDefault();
    const db = getDatabase();
    update(ref(db, `users/${CURRENT_USER?.uid}`), {
      username: user.username,
      bio: bio.bio,
    });

    // saving image
    const storage = getStorage();
    const reference = storageReference(storage, `users/${CURRENT_USER?.uid}`);
    const upload = uploadBytesResumable(reference, photo.photo);
    upload.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
          setUrlPhoto({ urlPhoto: downloadURL });
        });
      }
    );
  }

  useEffect(() => {
    const CURRENT_USER = getAuth().currentUser;
    let authToken = sessionStorage.getItem("Auth Token");
    if (!authToken) {
      window.location.href = "/";
    }
    const db = getDatabase();
    const startRef = ref(db, `users/${CURRENT_USER?.uid}`);
    onValue(startRef, (snapshot) => {
      const data = snapshot.val();
      setUser({ username: data.username });
      setBio({ bio: data.bio });
    });
  }, []);
  return (
    <>
      <Header />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        </div>
      </header>
      <div className="container  content-center grid justify-center mx-auto">
        <CardProfile urlImage={""} username={user.username} bio={bio.bio} />
      </div>
      <div className="container mx-auto">
        <div className="mx-4 top-px flex justify-center ">
          <div className="min-h-full">
            <div className="md:grid p-3 md:gap-6">
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST">
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                          <label
                            htmlFor="company-website"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Username
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                              type="text"
                              onChange={(e) =>
                                setUser({ username: e.target.value })
                              }
                              value={user.username}
                              name="username"
                              id="username"
                              className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                              placeholder="Username"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Bio
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="bio"
                            name="bio"
                            onChange={(e) => setBio({ bio: e.target.value })}
                            value={bio.bio}
                            rows={3}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="bio"
                            defaultValue={""}
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Brief description for your profile. URLs are
                          hyperlinked.
                        </p>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        onClick={onSubmit}
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
      </div>
    </>
  );
}
