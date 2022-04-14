import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getMessageFromErrorCode } from "../helpers/helpers";
import { XIcon } from "@heroicons/react/outline";
import { Navigate } from "react-router-dom";

interface IProps {}
interface IState {
  email: string;
  password: string;
  isLogged: boolean;
  hasError: boolean;
  errorCode: string;
  open: boolean;
  isRemember: boolean;
}

export default class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLogged: false,
      hasError: false,
      errorCode: "",
      open: false,
      isRemember: false,
    };
  }
  componentDidMount = () => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (authToken) {
      window.location.href = "/home";
    }
  
  };
  onsubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const authentication = getAuth();
    signInWithEmailAndPassword(
      authentication,
      this.state.email,
      this.state.password
    )
      .then((response) => {
        response.user.getIdToken().then((res) => {
          sessionStorage.setItem("Auth Token", res);
          if (this.state.isRemember) {
          }
          this.setState({ isLogged: true });
        });
      })
      .catch((err) => {
        this.setState({ hasError: true, errorCode: err.code, open: true });
        console.log(this.state.isRemember);
      });
  };
  render(): React.ReactNode {
    const isLogged = this.state.isLogged;
    const hasError = this.state.hasError;
    return (
      <>
        {isLogged ? <Navigate to="/home" replace={true} /> : null}

        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <form className="mt-8 space-y-6">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    onChange={(e) => this.setState({ email: e.target.value })}
                    value={this.state.email}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
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
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    onChange={(e) =>
                      this.setState({ isRemember: e.target.checked })
                    }
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

              {hasError ? (
                <div className="bg-orange-600">
                  <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between flex-wrap">
                      <div className="w-0 flex-1 flex items-center">
                        <p className="ml-3 font-medium text-white">
                          <span className="md:hidden">Error</span>
                          <span className="hidden md:inline">
                            {getMessageFromErrorCode(this.state.errorCode)}
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
                  onClick={this.onsubmit}
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
