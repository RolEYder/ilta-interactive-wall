import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
const userCur = getAuth().currentUser;
let authToken = sessionStorage.getItem("Auth Token");

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

function SignOut() {
  sessionStorage.removeItem("Auth Token");
  window.location.href = "/";
}

export default function Headeer() {
  const [auth, setAuth] = useState("");

  const [user, setUser] = useState({ name: null, email: null });
  const [navigation, setNavigation] = useState([
    { name: "Home", href: "/home", current: false },
  ]);
  const [userNavigation, setUserNavigation] = useState([
    { name: "Your Profile", href: "/profile" },
    { name: "Sign out", href: "#" },
  ]);
  const isLogged = () => {
    let authToken: any = sessionStorage.getItem("Auth Token");
    if (!authToken) {
      setUserNavigation([]);
      setNavigation([{ name: "Login", href: "/login", current: false }]);
    }
  };
  useEffect(() => {
    let authToken: any = sessionStorage.getItem("Auth Token");
    setAuth(authToken);
    isLogged();
    const userCur: any = getAuth().currentUser;
    setUser({ name: userCur?.displayName, email: userCur?.email });
  }, [user]);
  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                   <Link to={"/home"}> <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                    
                    /></Link>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      
                    
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {authToken === null ? (<a
                      type="button"
                      href="/login"
                      className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Log in
                    </a>) : (<><a
                      type="button"
                      onClick={() => SignOut()}
                      className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Sign Out
                    </a></>)}
                    

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        {authToken === null ? (<Link to="/signup" replace={true}>
                          <a
                            type="button"
                            className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                          >
                            Sign up
                          </a>
                        </Link>) : (<Link to="/profile" replace={true}>
                          <a
                            type="button"
                            className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                          >
                            Profile
                          </a>
                        </Link>)}
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {authToken ===  null ? (
                            <>
                              <Menu.Item key="1">
                                <a
                                  href="/login"
                                  className="bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                                >
                                  Login
                                </a>
                              </Menu.Item>
                              <Menu.Item key="2">
                                <a
                                  href="/signup"
                                  className="bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                                >
                                  Signup
                                </a>
                              </Menu.Item>
                            </>
                          ) : null}
                          
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {authToken !== null ? (
                  <>
                    <Disclosure.Button
                      key="1"
                      as="a"
                      href="/home"
                      className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Home
                    </Disclosure.Button>
                  </>
                ) : (null)}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  ></button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                 {authToken === null ? ( <><Disclosure.Button
                    as="a"
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    Log in 
                  </Disclosure.Button><a
                    onClick={() => SignOut()}
                    href="/signup"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                      Sign up
                    </a></>) : (<> <Disclosure.Button
                    as="a"
                    href="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    Your Profile
                  </Disclosure.Button>
                  <a
                    onClick={() => SignOut()}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    Sign Out
                  </a></>)}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
