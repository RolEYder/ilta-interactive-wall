/* This example requires Tailwind CSS v2.0+ */
import React, { useEffect, Fragment, useState } from "react";
import Header from "../components/partials/Header";
import Modal from "../components/modals/Modal";
import CreatePost from "../components/posts/create-post";
import useModal from "../hooks/useModal";
import { useNavigate } from "react-router-dom";
import PostList from "../components/posts/post-list";
import { getDatabase, onValue, ref } from "firebase/database";

import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref as storageReference,
} from "firebase/storage";

export default function Home() {
  const { showModal, hideModal, visible } = useModal();
  const [post, setPost] = useState([]);
  const [photo, setPhoto] = useState([""]);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  function isLogged() {
    let authToken = sessionStorage.getItem("Auth Token");
    if (authToken) {
      navigate("/home");
    }
    if (!authToken) {
      navigate("/");
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAllPost = () => {
    setLoading(true)
    const db = getDatabase();
    const reference = ref(db, "posts/");
    onValue(reference, (snapshot) => {
      let values: any = [];
      snapshot.forEach((snap) => {
        values.push(snap.val());
      });

      //soring by timestamp
      values.sort(function (x: any, y: any) {
        return y.post_time - x.post_time;
      });
      // eslint-disable-next-line array-callback-return
      values.map((v: any) => {
        if (v.photoUser != null || v.photoUser != null || v.photoUser !== "") {
          const storage = getStorage();
          const photoRef = storageReference(storage, `${v.photoUser}`);
          getDownloadURL(photoRef)
            .then((url) => {
              photo.push(url);
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          photo.push(
            "https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          );
        }
      });
      setTimeout(() => {
      setPost(values);
      setLoading(false)
      }, 2000);
      
      console.log(photo);
    });
  };
  useEffect(() => {
    getAllPost();
  }, []);
  return (
    <>
      <div className="min-h-full">
        <Header />
        {/* Change depeding the view*/}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Home</h1>
          </div>
        </header>

        <main>
          <div className="h-10 relative top-px flex justify-center ">
            <button
              onClick={() => showModal()}
              type="button"
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              Create Post
            </button>

            <Modal visible={visible}>
              <CreatePost />
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded"
                onClick={() => hideModal()}
              >
                Back
              </button>
            </Modal>
          </div>
          {loading? (<div className="border border-blue-300 shadow rounded-md p-4 mx-4 md:mx-auto my-5 max-w-md md:max-w-2xlmax-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-700 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-700 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          ):(<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {/* Replace with your content */}
            {post.map((v: any, i) => (
              <PostList
                key={v.uid}
                photo={photo[i]}
                username={v.username}
                contect={v.content}
                timeago={v.post_time}
                joined={v.joinedUser}
              />
            ))}
            {/* /End replace */}
          </div>)}
          
        </main>
      </div>
    </>
  );
}
