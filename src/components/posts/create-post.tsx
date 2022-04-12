import React from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { getTimeStamp } from "../../helpers/helpers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { XIcon } from "@heroicons/react/outline";
interface IProps {}
interface IState {
  title: string;
  content: string;
  hasError: boolean;
  err: string;
}
export default class CreatePost extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      title: "",
      content: "",
      hasError: false,
      err: "",
    };
  }
  onsubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // getting authuser info
    let user = getAuth().currentUser;
    let timestamp = getTimeStamp();
    const db = getDatabase();
    const uuid = uuidv4();
    if (this.state.title.length === 0) {
      this.setState({ hasError: true, err: "😥 Oops! Title is emplty!" });
    } else if (this.state.content.length === 0) {
      this.setState({ hasError: true, err: "😥 Oops! Content is emplty!" });
    } else {
      set(ref(db, `posts/${uuid}`), {
        content: this.state.content,
        post_time: timestamp,
        title: this.state.title,
        user: user?.uid,
        username: user?.displayName,
      })
        .then((res) => {
          console.log(res);

          toast.success("🤩 Wow, you post was saved!", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.setState({ title: "", content: "" });
        })

        .catch((err) => {
          console.log(err);
        });
    }
  };
  render(): React.ReactNode {
    const hasError = this.state.hasError;

    return (
      <>
        <div>
          <form>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <p>Create post</p>
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="company-website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        onChange={(e) =>
                          this.setState({ title: e.target.value })
                        }
                        value={this.state.title}
                        name="post-title"
                        id="post-title"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="title"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    You post...
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="post"
                      onChange={(e) =>
                        this.setState({ content: e.target.value })
                      }
                      value={this.state.content}
                      name="post"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="You post.."
                      defaultValue={""}
                      required
                    />
                  </div>
                </div>
                {hasError ? (
                  <div className="bg-orange-600 rounded-md">
                    <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                      <div className="flex items-center justify-between flex-wrap">
                        <div className="w-0 flex-1 flex items-center">
                          <p className="ml-3 font-medium text-white truncate">
                            <span className="md:hidden">Error</span>
                            <span className="hidden md:inline">
                              {this.state.err}
                            </span>
                          </p>
                        </div>
                        <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                          <button
                            type="button"
                            onClick={() => this.setState({ hasError: false })}
                            className="-mr-1 flex p-2 rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                          >
                            <span className="sr-only">Dismiss</span>
                            <XIcon
                              className="h-6 w-6 text-white"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200"
                  onClick={this.onsubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  }
}
