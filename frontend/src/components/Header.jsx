import React from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { FcSearch } from "react-icons/fc";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaUserCheck, FaSignOutAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";

export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const themeState = useSelector((state) => state.theme);
  const { theme } = themeState;

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar className='border-b-gray-100 border-b-2 bg-[#BEBFC3] dark:bg-[#18191D]'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white flex items-center'
      >
        <Avatar
          img='https://i.pinimg.com/originals/4b/83/b8/4b83b890a44d679f7e510396e09b49c5.gif'
          alt='LMS'
        />
        <span className='px-2 py-1 bg-gradient-to-r from-purple-900 via-slate-400 to-blue-600 rounded-lg text-white'>
          Books'
        </span>
        Club
      </Link>

      <TextInput
        type='text'
        placeholder='Search...'
        rightIcon={FcSearch}
        className='hidden lg:inline text-2xl'
      />

      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <FcSearch className='text-2xl' />
      </Button>
      <div className='flex gap-10 md:order-2'>
        <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt='user' img={currentUser.profilePicture} rounded />
              }
            >
              <Dropdown.Header>
                <FaUserCheck className='w-10 h-10' color='navy' />

                <span className='block text-md font-bold text-black truncate'>
                  @{currentUser.username}
                </span>
                <span className='block text-sm font-medium text-black truncate'>
                  {currentUser.email}
                </span>
              </Dropdown.Header>

              <Link to='/dashboard?tab=profile'>
                <Dropdown.Item className='text-blue-500 font-semibold'>
                  <ImProfile className='w-4 h-4 mr-2' color='blue' />
                  Profile
                </Dropdown.Item>
              </Link>

              <Dropdown.Divider />

              <Dropdown.Item
                className='text-red-500 font-semibold'
                onClick={handleSignout}
              >
                <FaSignOutAlt className='w-4 h-4 mr-2' color='red' />
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' color='gray' pill outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
