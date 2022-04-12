/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import Header from "../components/partials/Header";
import Modal from "../components/modals/Modal";
import CreatePost from "../components/posts/create-post";
import useModal from "../hooks/useModal";
export default function Home() {
  const { showModal, hideModal, visible } = useModal();

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
              className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Create Post
            </button>
            <Modal visible={visible}>
              <CreatePost />
              <button
                type="button"
                className="text-white bg-gray-600 hover:bg-gray-700"
                onClick={() => hideModal()}
              >
                Back
              </button>
            </Modal>
          </div>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
}
