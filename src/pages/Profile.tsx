import React from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { XIcon } from "@heroicons/react/outline";
import Header from "../components/partials/Header";
import CardProfile from "../components/profile/card-profile";
import {
  getDownloadURL,
  getStorage,
  ref as storageReference,
  uploadBytesResumable,
} from "firebase/storage";
import "firebase/compat/storage";
interface IProps { }
interface IState {
  username: string;
  bio: string;
  photo: any;
  urlImage: string;
  isPhoto: boolean;
  hasError: boolean;
  panelPhoto: any;
  err: string;
}

export default class Profile extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      username: "",
      bio: "",
      photo: null,
      urlImage: "",
      isPhoto: false,
      panelPhoto: null,
      hasError: false,
      err: "",
    };
  }

  loadProfile = () => {
    const CURRENT_USER = getAuth().currentUser;
    let authToken = sessionStorage.getItem("Auth Token");
    if (!authToken) {
      window.location.href = "/";
    }
    const db = getDatabase();
    const startRef =  ref(db, `users/${CURRENT_USER?.uid}`);
    const storage =  getStorage();
    const spaceRef =  storageReference(
      storage,
      `users/${CURRENT_USER?.uid}`
    );
    getDownloadURL(spaceRef).then((url) => {
      this.setState({ urlImage: url });
    });
     onValue(startRef, (snapshot) => {
      const data = snapshot.val();
      this.setState({ username: data.username, bio: data.bio });
      console.log(data);
    });
  }
  componentDidMount =  () => {
   this.loadProfile();
  };
 
  getInititalStates = () => ({
    username: "",
    bio: "",
    photo: null,
    urlImage: "",
    isPhoto: false,
    hasError: false,
    err: "",
  });


  isImage = (file: any) => {
    return file && file["type"].split("/")[0] === "image";
  };
  photoOnChange = (e: any) => {
    if (this.isImage(e.target.files[0]) === true) {
      this.setState({
        isPhoto: true,
        photo: e.target.files[0],
        urlImage: URL.createObjectURL(e.target.files[0]),
      });
      this.setState({ isPhoto: true });
    } else {
      this.setState({
        hasError: true,
        err: "Oops! 😥 The file is not an image",
      });
    }
    console.log(this.state);
  };
  onsubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const CURRENT_USER = getAuth().currentUser;
    e.preventDefault();
    const db = getDatabase();
    update(ref(db, `users/${CURRENT_USER?.uid}`), {
      username: this.state.username,
      bio: this.state.bio,
    });

    // saving image
    const storage = getStorage();
    const reference = storageReference(storage, `users/${CURRENT_USER?.uid}`);
    const upload = uploadBytesResumable(reference, this.state.photo);
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
          this.setState({ urlImage: downloadURL });
        });
      }
    );
  };

  render(): React.ReactNode {
    const hasError = this.state.hasError;
    return (
      <>
        <Header />
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          </div>
        </header>
        <div className="container  content-center grid justify-center mx-auto">
          <CardProfile
            urlImage={this.state.urlImage}
            username={this.state.username}
          />
        </div>
        <div className="container mx-auto flex">
          <div className="mx-4 top-px flex justify-center ">
            <div className="min-h-full">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Profile
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      This information will be displayed publicly so be careful
                      what you share.
                    </p>
                  </div>
                </div>
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
                                  this.setState({ username: e.target.value })
                                }
                                value={this.state.username}
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
                              onChange={(e) =>
                                this.setState({ bio: e.target.value })
                              }
                              value={this.state.bio}
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

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Photo
                          </label>
                          <div className="mt-1 flex items-center">
                            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                              <img
                                alt="profile"
                                src={this.state.urlImage}
                                className="mx-auto object-cover rounded-full h-10 w-10 "
                              />
                            </span>
                            <input
                              id="photo"
                              type="file"
                              onChange={this.photoOnChange}
                              className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Cover photo
                          </label>
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                  <span>Upload a file</span>
                                  <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                          onClick={this.onsubmit}
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
}
