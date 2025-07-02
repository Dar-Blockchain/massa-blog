import React, { FC, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { BellIcon } from "@heroicons/react/24/outline";
import Avatar from "@/components/Avatar/Avatar";

const notifications = [
  {
    name: "Eden Tuan",
    description: "Mentioned you in a comment",
    time: "3 minutes ago",
    href: "##",
  },
  {
    name: "Leo Messi",
    description: "Create new post",
    time: "1 hour ago",
    href: "##",
  },
  {
    name: "Danieal",
    description: "Followed you",
    time: "3 hours ago",
    href: "##",
  },
];

export interface NotifyDropdownProps {
  className?: string;
  panelClassName?: string;
}

const NotifyDropdown: FC<NotifyDropdownProps> = ({
  className = "",
  panelClassName = "",
}) => {
  return (
    <div className={`NotifyDropdown ${className}`}>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group p-3 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}
            >
              <span className="w-2 h-2 bg-blue-500 absolute top-2 right-2 rounded-full"></span>
              <BellIcon className="w-6 h-6" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className={`absolute z-10 w-screen max-w-xs sm:max-w-sm px-4 mt-4 sm:px-0 ${panelClassName}`}>
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7">
                    <h3 className="text-xl font-semibold">Notifications</h3>
                    {notifications.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="flex p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200 sm:h-12 sm:w-12">
                          <BellIcon className="h-6 w-6" />
                        </div>
                        <div className="ms-4">
                          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                            {item.name}
                          </p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            {item.description}
                          </p>
                          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                            {item.time}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default NotifyDropdown;
