import React from "react";
import { registerWithEmailAndPassword } from "../models/auth.controller";
import { toast } from "../components/toast/ToastManagement";
import SignUpModal from "../components/modals/signUpModal";

interface IProps {}

interface IState {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  wasSuccess: boolean
}

export default class SingUp extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      wasSuccess: false
    };
  }

  checkProperDataBeforeSubmit = () => {
    if ((this.state.username.length < 5) === true) {
      toast.show({
        title: "Invalid username",
        content: "You username must be at least of 6 characters",
        duration: 5000,
      });
      return false;
    } else if ((this.state.password === this.state.repeatPassword) !== true) {
      toast.show({
        title: "Invalid password",
        content: "You passwords does not match, check it again",
        duration: 5000,
      });
      return false;
    }
    return true;
  };
  onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (this.checkProperDataBeforeSubmit() === true) {
     let res  =  registerWithEmailAndPassword(
        this.state.username,
        this.state.email,
        this.state.password
      );
      res.then(value=> {
        
        this.setState({wasSuccess: true})
      })
       
    }
  };
  render(): React.ReactNode {
    if (this.state.wasSuccess === true) {
      <SignUpModal willOpen={true} title={"The account was created successfully"} content={"Click on the button to log in"}/>
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

              <div>
                <button
                  type="submit"
                  onClick={this.onSubmit}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
