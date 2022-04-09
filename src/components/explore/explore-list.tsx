import React from "react";
interface IProps {
  uid?: string;
  username?: string;
  email?: string;
}
interface IState {
  noPost: 0;
  isFollowing: false;
}

export default class ExploreList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      noPost: 0,
      isFollowing: false,
    };
  }
  componentDidMount = async () => {};
  render(): React.ReactNode {
    return (
      <>
        <tr>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="#" className="block relative">
                  <img
                    alt="profil"
                    src="/images/person/8.jpg"
                    className="mx-auto object-cover rounded-full h-10 w-10 "
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">
                  {this.props.username}
                </p>
                <span className="">{this.props.email}</span>
              </div>
            </div>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">15</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
              <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200">
                Follow
              </button>
            </span>
          </td>
        </tr>
      </>
    );
  }
}
