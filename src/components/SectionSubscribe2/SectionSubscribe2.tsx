import React, { FC } from "react";
import { Link } from "react-router-dom";
import rightImg from "../../images/SVG-subcribe2.png";
import Image from "../../compat/next/image";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Badge from "../Badge/Badge";
import Input from "../Input/Input";

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row items-center ${className}`}
    >
      <div className="flex-shrink-0 mb-14 lg:mb-0 lg:mr-10 lg:w-2/5">
        <h2 className="font-semibold text-4xl">Join our newsletter 👋</h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400">
          Read and share new perspectives on just about any topic. Everyone's welcome.
        </span>
        <ul className="space-y-5 mt-10">
          <li className="flex items-center space-x-4 rtl:space-x-reverse">
            <Badge name="01" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Get more discount
            </span>
          </li>
          <li className="flex items-center space-x-4 rtl:space-x-reverse">
            <Badge color="red" name="02" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Get premium magazines
            </span>
          </li>
        </ul>
        <form className="mt-10 relative max-w-sm">
          <input
            type="email"
            className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-full px-4 py-3 sm:text-sm"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className="absolute transform top-1/2 -translate-y-1/2 right-1 w-12 h-12 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-700 dark:hover:bg-neutral-600 flex items-center justify-center"
          >
            <ArrowRightIcon className="w-6 h-6" />
          </button>
        </form>
      </div>
      <div className="flex-grow">
        <Image
          src={rightImg}
          alt="Subscribe"
          width={800}
          height={450}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default SectionSubscribe2;
