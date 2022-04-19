import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getTimeStamp } from "../helpers/helpers";
import bcrypt from "bcryptjs";
import { auth } from "../config/firebaseConfig";
import { getDatabase, ref, set } from "firebase/database";
import { XIcon } from "@heroicons/react/outline";

interface IProps {}

interface IState {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  wasSuccess: boolean;
  hasError: boolean;
  errorCode: string;
}

export default class SingUp extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      wasSuccess: false,
      hasError: false,
      errorCode: "",
    };
  }
  componentDidMount = () => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (authToken) {
      window.location.href = "/home";
    }
  };

  checkProperDataBeforeSubmit = () => {
    if (this.state.username.length < 5 === true) {
      this.setState({
        hasError: true,
        errorCode: "Invalid username. You must be at least of 6 characters",
      });
      return false;
    } else if ((this.state.password === this.state.repeatPassword) !== true) {
      this.setState({
        hasError: true,
        errorCode:
          "Invalid password. You passwords does not match, check it again",
      });
      return false;
    }
    return true;
  };
  onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (this.checkProperDataBeforeSubmit() === true) {
      try {
        const joined = getTimeStamp();
        let hashPassword = "";
        const res = await createUserWithEmailAndPassword(
          auth,
          this.state.email,
          this.state.password
        );
        const user = res.user;

        bcrypt.hash(this.state.password, 10, (error: Object, hash: any) => {
          hashPassword = hash;
          const db = getDatabase();
          set(ref(db, `users/${user.uid}`), {
            uid: user.uid,
            bio: "",
            joined: joined,
            username: this.state.username,
            email: this.state.email,
            password: hashPassword,
          }).then(() => {
            updateProfile(user, { displayName: this.state.username }).then(
              () => {
                this.setState({ wasSuccess: true });
              }
            );
          });
          return user;
        });
      } catch (err: any) {
        console.log(err.code);

        this.setState({ hasError: true, errorCode: err.code });
        console.log(this.state.errorCode);
      }
    }
  };
  render(): React.ReactNode {
    if (this.state.wasSuccess === true) {
      window.location.href = "/login";
    }
    return (
      <>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign up
              </h2>
            </div>
            <form className="mt-8 space-y-6">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="username" className="">
                    Username
                  </label>
                  <input
                    onChange={(e) =>
                      this.setState({ username: e.target.value })
                    }
                    id="username"
                    name="username"
                    type="username"
                    value={this.state.username}
                    autoComplete="username"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                  />
                </div>
                <div>
                  <label htmlFor="email-address" className="">
                    Email address
                  </label>
                  <input
                    onChange={(e) => this.setState({ email: e.target.value })}
                    value={this.state.email}
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="">
                    Password
                  </label>
                  <input
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                    value={this.state.password}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
                <div>
                  <label htmlFor="repeat-password" className="">
                    Password again
                  </label>
                  <input
                    onChange={(e) =>
                      this.setState({ repeatPassword: e.target.value })
                    }
                    value={this.state.repeatPassword}
                    id="repeat-password"
                    name="repeat-password"
                    type="password"
                    autoComplete="Password again"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password again"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              {this.state.hasError ? (
                <div className="bg-orange-600">
                  <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between flex-wrap">
                      <div className="w-0 flex-1 flex items-keft">
                        <p className="ml-3 font-medium text-white ">
                          <span className="md:hidden">Error</span>
                          <span className="hidden md:inline">
                            {this.state.errorCode}
                          </span>
                        </p>
                      </div>
                      <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                        <button
                          type="button"
                          onClick={() => this.setState({ hasError: false })}
                          className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
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
              <div>
                <button
                  type="submit"
                  onClick={this.onSubmit}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
