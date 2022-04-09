import Header from "../components/partials/Header";
import ExploreList from "../components/explore/explore-list";
import React from "react";
import { getDatabase, ref, onValue } from "firebase/database";

interface IProps {}
interface IState {
  noPost: 0;
  isFollowing: false;
  usersData: any[];
}

export default class Explore extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      noPost: 0,
      isFollowing: false,
      usersData: [],
    };
  }
  componentWillUnmount = async () => {
    const db = getDatabase();
    const reference = ref(db, "users/");
    onValue(reference, (snapshot) => {
      let values: any = [];
      snapshot.forEach((snap) => {
        values.push(snap.val());
      });
      this.setState({ usersData: values });
    });
  };
  componentDidMount = async () => {};
  render(): React.ReactNode {
    // let data = this.state.usersData.en(e =>
    //     <ExploreList {...e} />
    // )
    return (
      <>
        <Header />
        {/* Change depeding the view*/}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Explore</h1>
          </div>
        </header>
        <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
          <div className="py-8">
            <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
              <h2 className="text-2xl leading-tight">Users</h2>
              <div className="text-end">
                <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                  <div className=" relative ">
                    <input
                      type="text"
                      id='"form-subscribe-Filter'
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="name"
                    />
                  </div>
                  <button
                    className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                    type="submit"
                  >
                    Find
                  </button>
                </form>
              </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        NO. POSTS
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.usersData.map((value) => (
                      <ExploreList
                        key={value.uid}
                        uid={value.uid}
                        email={value.email}
                        username={value.username}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
