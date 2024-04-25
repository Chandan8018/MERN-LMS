import { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { FcSearch } from "react-icons/fc";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaUserCheck, FaSignOutAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import icon from "../assets/logo2.png";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const themeState = useSelector((state) => state.theme);
  const { theme } = themeState;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className='border-b-gray-100 border-b-2 sticky top-0 z-10'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white flex items-center'
      >
        <img src={icon} alt='logo' className='h-12 w-36' />
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={FcSearch}
          className='hidden lg:inline text-2xl'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
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

              <Link to='/dashboard?tab=dash'>
                <Dropdown.Item className='text-blue-500 font-semibold'>
                  <ImProfile className='w-4 h-4 mr-2' color='blue' />
                  Dashboard
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
            <Button
              className='hover:text-black hover:bg-gradient-to-r from-[#9C7945] via-[#F4EBA3] to-[#9C7945]'
              color='gray'
              pill
              outline
            >
              <span className='hover:text-black'>Sign In</span>
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
        <Navbar.Link active={path === "/Books"} as={"div"}>
          <Link to='/Books'>Books</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
