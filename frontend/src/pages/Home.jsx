import { Button, Carousel, Popover } from "flowbite-react";

import "./Home.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import EmployeeSlider from "../components/HomeComponents/EmployeeSlider";
import SwiperComp from "../components/HomeComponents/SwiperComp";

export default function Home() {
  return (
    <div className='main min-h-screen bg-[#BEBFC3] dark:bg-gray-900'>
      <div className='h-64 sm:h-80 xl:h-96 bg-[#FDFBFC]'>
        <Carousel pauseOnHover>
          <img src='https://i.imgur.com/3dRgsnq.jpeg ' alt='Image 2' />
          <img src='https://i.imgur.com/QJG67Dr.jpeg ' alt='Image 2' />
          <img src='https://i.imgur.com/Q4ziDQr.jpeg ' alt='Image 3' />
          <img src='https://i.imgur.com/oOMwTl6.jpeg ' alt='Image 3' />
          <img src='https://i.imgur.com/jVk9vs4.jpeg ' alt='Image 3' />
        </Carousel>
      </div>
      <div className='flex flex-col items-center justify-center mt-10'>
        <span className='text-md rounded-lg text-[#FF9F41] bg-[#FFF6EC] p-3 border-[#FF9F41] border-solid border-x border-y'>
          Open Source Library for Digital Commerce
        </span>
        <h1 className='heading'>Everyone's Welcome!</h1>
        <h6 className='text-[#28699b] text-center'>
          Connect. Discover. Manage: Your Gateway to a Digital Library
          Experience.
        </h6>
        <div className='flex gap-14 my-5'>
          <Link to='/guidelines'>
            <Button
              color='blue'
              className='bg-[#FF9F41] flex justify-center items-center'
            >
              How To Join <FaArrowRightLong className='ml-5 mt-1' />
            </Button>
          </Link>
          <Popover
            aria-labelledby='profile-popover'
            content={
              <div className='w-64 p-3'>
                <div className='mb-2 flex items-center justify-between'>
                  <a href='#'>
                    <img
                      className='h-10 w-10'
                      src='https://i.pinimg.com/originals/4b/83/b8/4b83b890a44d679f7e510396e09b49c5.gif'
                      alt="Books' Club"
                    />
                  </a>
                  <div>
                    <button
                      type='button'
                      className='rounded-lg bg-blue-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    >
                      Follow
                    </button>
                  </div>
                </div>
                <p
                  id='profile-popover'
                  className='text-base font-semibold leading-none text-gray-900 dark:text-white'
                >
                  <a href='#'>Books' Club</a>
                </p>
                <p className='mb-3 text-sm font-normal'>
                  <a href='#' className='hover:underline'>
                    @booksclub
                  </a>
                </p>
                <p className='mb-4 text-sm'>
                  Open Source Library for Digital Commerce. Building{" "}
                  <a
                    href='#'
                    className='text-blue-600 hover:underline dark:text-blue-500'
                  >
                    booksclub.com
                  </a>
                  .
                </p>
                <ul className='flex text-sm'>
                  <li className='me-2'>
                    <a href='#' className='hover:underline'>
                      <span className='font-semibold text-gray-900 dark:text-white'>
                        799
                      </span>
                      <span>Following</span>
                    </a>
                  </li>
                  <li>
                    <a href='#' className='hover:underline'>
                      <span className='font-semibold text-gray-900 dark:text-white'>
                        3,758
                      </span>
                      <span>Followers</span>
                    </a>
                  </li>
                </ul>
              </div>
            }
          >
            <Button>Books' Club</Button>
          </Popover>
        </div>
      </div>
      <hr />
      <hr />
      <hr />
      <SwiperComp />
      <br />
      {/* Employee Slider */}
      <EmployeeSlider />
    </div>
  );
}
