import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaSignOutAlt, FaUsers } from "react-icons/fa";
import { HiUser } from "react-icons/hi";
import { BiSolidBookAdd } from "react-icons/bi";
import { GiBookmarklet } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

export default function DashSideBar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlPharse = new URLSearchParams(location.search);
    const tabFromUrl = urlPharse.get("tab");
    setTab(tabFromUrl);
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

  return (
    <Sidebar className='w-full md:w-56' aria-label='Sidebar'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "Student"}
              className='cursor-pointer dark:hover:text-black hover:bg-gradient-to-r from-[#9C7945] via-[#F4EBA3] to-[#9C7945] rounded-lg'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard?tab=books'>
            <Sidebar.Item
              active={tab === "books"}
              icon={GiBookmarklet}
              className='cursor-pointer dark:hover:text-black hover:bg-gradient-to-r from-[#9C7945] via-[#F4EBA3] to-[#9C7945] rounded-lg'
              as='div'
            >
              Books' Collection
            </Sidebar.Item>
          </Link>

          {currentUser.isAdmin && (
            <>
              <Link to='/dashboard?tab=add-book'>
                <Sidebar.Item
                  active={tab === "add-book"}
                  icon={BiSolidBookAdd}
                  className='cursor-pointer dark:hover:text-black hover:bg-gradient-to-r from-[#9C7945] via-[#F4EBA3] to-[#9C7945] rounded-lg'
                  as='div'
                >
                  Add Book
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=users'>
                <Sidebar.Item
                  active={tab === "users"}
                  icon={FaUsers}
                  className='cursor-pointer dark:hover:text-black hover:bg-gradient-to-r from-[#9C7945] via-[#F4EBA3] to-[#9C7945] rounded-lg'
                  as='div'
                >
                  Users
                </Sidebar.Item>
              </Link>
            </>
          )}
          {!currentUser.isAdmin && (
            <Link to='/dashboard?tab=book-borrow'>
              <Sidebar.Item
                active={tab === "book-borrow"}
                icon={FaUsers}
                className='cursor-pointer dark:hover:text-black hover:bg-gradient-to-r from-[#9C7945] via-[#F4EBA3] to-[#9C7945] rounded-lg'
                as='div'
              >
                Book Borrow
              </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item
            icon={FaSignOutAlt}
            className='cursor-pointer hover:bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 rounded-lg'
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
