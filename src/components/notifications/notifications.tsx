import {  useState } from "react";
import { Dialog } from "@headlessui/react";
import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline";
interface IProps {
  type?: string;
  content?: string;
  title?: string;
}

export default function SuccessNotify(props: IProps) {
  function getTypeAlertColor() {
    switch (props.type) {
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-orange-500 ";
      case "sucess":
        return "bg-indigo-800";
      default:
        break;
    }
  }
  const [open, setOpen] = useState(true);
  const typeAlert = getTypeAlertColor();

  return (
    <>
      <Dialog
        as="div"
        open={open}
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className={typeAlert}>
          <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap">
              <div className="w-0 flex-1 flex items-center">
                <span className={`${typeAlert} flex p-2 rounded-lg`}>
                  <SpeakerphoneIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </span>
                <p className="ml-3 font-medium text-white truncate">
                  <span className="md:hidden">We announced a new product!</span>
                  <span className="hidden md:inline">
                    {props.title} {props.content}.
                  </span>
                </p>
              </div>

              <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                <button
                  onClick={() => setOpen(false)}
                  type="button"
                  className={`-mr-1 flex p-2 rounded-md hover:${typeAlert} focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2`}
                >
                  <span className="sr-only">Dismiss</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
