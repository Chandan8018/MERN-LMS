import React, { useState } from "react";
import { Avatar, Card } from "flowbite-react";
import { useSelector } from "react-redux";
import image from "../../assets/logo2.png";

export default function LibraryCard() {
  const { currentUser } = useSelector((state) => state.user);
  const [active, setActive] = useState(false);
  return (
    <Card className='max-w-sm max-h-[360px] mx-auto mt-20 sm:mb-5 shadow-lg shadow-black'>
      <div className='flex flex-col items-center '>
        <h3 className='mb-1 text-2xl font-medium text-blue-600 dark:text-blue-500 mt-[-20px]'>
          ✦✦ Library Card ✦✦
        </h3>
        <img src={image} className='h-20 mt-[-10px]' />
        <img
          alt={currentUser?.username}
          height='60'
          src={currentUser?.profilePicture}
          width='60'
          className='mb-3 rounded-full shadow-lg'
        />
        {active && (
          <>
            <h5 className='mb-1 text-xl font-medium text-blue-600 dark:text-blue-500'>
              <span className='text-gray-900 dark:text-white'>LCN:</span>{" "}
              {currentUser?.regdNumber}
            </h5>
            <span className='text-sm text-gray-500 dark:text-gray-400'>
              {new Date().getFullYear()} - {new Date().getFullYear() + 1}
            </span>
          </>
        )}
        <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
          {currentUser?.username}
        </h5>
        <span className='text-sm text-gray-500 dark:text-gray-400'>
          {currentUser?.email}
        </span>
        {!active && (
          <div className='mt-4 flex lg:mt-6' onClick={() => setActive(true)}>
            <a
              href='#'
              className='inline-flex items-center rounded-lg bg-gradient-to-r from-[#9C7945] via-[#F4EBA3] to-[#9C7945] px-4 py-2 text-center text-sm font-medium text-black hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800'
            >
              Active Now
            </a>
          </div>
        )}
      </div>
    </Card>
  );
}
