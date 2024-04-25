import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { ImBooks } from "react-icons/im";
import { FaRupeeSign } from "react-icons/fa";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import StudentDashboardComp from "./StudentDashboardComp";

export default function DashboardComp() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthBorrowedBooks, setLastMonthBorrowedBooks] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [totalFines, setTotalFines] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  const handleReturnDate = (date) => {
    const borrowDate = new Date(date);
    const timestampAfter15Days = borrowDate.getTime() + 7 * 24 * 60 * 60 * 1000;
    const dateAfter15Days = new Date(timestampAfter15Days);
    const localizedDateAfter15Days = dateAfter15Days.toLocaleDateString();
    return localizedDateAfter15Days;
  };

  const handleFine = (returnDate) => {
    const bookBorrowReturnDate = new Date(returnDate);
    const todayDate = new Date();
    const differenceInTime =
      todayDate.getTime() - bookBorrowReturnDate.getTime();

    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    const fine = Math.max(0, Math.ceil(differenceInDays)) * 10;
    return fine;
  };
  const calculatTotalFines = () => {
    let fine = 0;
    borrowedBooks.map((borrowBook) => {
      fine += Number(handleFine(handleReturnDate(borrowBook.updatedAt)));
      return setTotalFines(fine);
    });
  };

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const res = await fetch(`/api/student/getstudentborrowbooks`);
        const data = await res.json();
        if (res.ok) {
          setBorrowedBooks(data.borrowBooks);
          setTotalBorrowedBooks(data.totalBooksBorrow);
          setLastMonthBorrowedBooks(data.lastMonthBorrowBooks);
          calculatTotalFines();
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
      fetchBorrowedBooks();
    }
  }, [currentUser]);
  return currentUser.isAdmin ? (
    <>
      <div className='p-3 md:mx-auto bg-white dark:bg-black dark:text-white'>
        <div className='flex-wrap flex gap-4 justify-center'>
          <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
            <div className='flex justify-between'>
              <div className=''>
                <h3 className='text-gray-500 text-md uppercase'>
                  Total Borrowed Books
                </h3>
                <p className='text-2xl'>{totalBorrowedBooks}</p>
              </div>
              <ImBooks className='bg-yellow-300 text-slate-700 rounded-full text-5xl m-3 p-1 shadow-lg' />
            </div>
            <div className='flex  gap-2 text-sm'>
              <span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp />
                {lastMonthBorrowedBooks}
              </span>
              <div className='text-gray-500'>Last month</div>
            </div>
          </div>
          <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
            <div className='flex justify-between'>
              <div className=''>
                <h3 className='text-gray-500 text-md uppercase'>Total Fines</h3>
                <p className='text-2xl'>₹ {totalFines}</p>
              </div>
              <FaRupeeSign className='bg-red-600  text-white rounded-full text-5xl p-3 shadow-lg' />
            </div>
          </div>
          <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
            <div className='flex justify-between'>
              <div className=''>
                <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
                <p className='text-2xl'>{totalUsers}</p>
              </div>
              <HiOutlineUserGroup className='bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg' />
            </div>
            <div className='flex  gap-2 text-sm'>
              <span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp />
                {lastMonthUsers}
              </span>
              <div className='text-gray-500'>Last month</div>
            </div>
          </div>
          <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
            <div className='flex justify-between'>
              <div className=''>
                <h3 className='text-gray-500 text-md uppercase'>
                  Total Reviews
                </h3>
                <p className='text-2xl'>{totalComments}</p>
              </div>
              <HiAnnotation className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
            </div>
            <div className='flex  gap-2 text-sm'>
              <span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp />
                {lastMonthComments}
              </span>
              <div className='text-gray-500'>Last month</div>
            </div>
          </div>
          <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
            <div className='flex justify-between'>
              <div className=''>
                <h3 className='text-gray-500 text-md uppercase'>
                  Total Books' Post
                </h3>
                <p className='text-2xl'>{totalPosts}</p>
              </div>
              <HiDocumentText className='bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg' />
            </div>
            <div className='flex  gap-2 text-sm'>
              <span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp />
                {lastMonthPosts}
              </span>
              <div className='text-gray-500'>Last month</div>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
          <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
            <div className='flex justify-between  p-3 text-sm font-semibold'>
              <h1 className='text-center p-2'>Recent users</h1>
              <Button outline gradientDuoTone='purpleToPink'>
                <Link to={"/dashboard?tab=users"}>See all</Link>
              </Button>
            </div>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>User image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
              </Table.Head>
              {users &&
                users.map((user) => (
                  <Table.Body key={user._id} className='divide-y'>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell>
                        <img
                          src={user.profilePicture}
                          alt='user'
                          className='w-10 h-10 rounded-full bg-gray-500'
                        />
                      </Table.Cell>
                      <Table.Cell>{user.username}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          </div>
          <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
            <div className='flex justify-between  p-3 text-sm font-semibold'>
              <h1 className='text-center p-2'>Recent reviews</h1>
              <Button outline gradientDuoTone='purpleToPink'>
                <Link to={"/dashboard?tab=comments"}>See all</Link>
              </Button>
            </div>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Review content</Table.HeadCell>
                <Table.HeadCell>Likes</Table.HeadCell>
              </Table.Head>
              {comments &&
                comments.map((comment) => (
                  <Table.Body key={comment._id} className='divide-y'>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell className='w-96'>
                        <p className='line-clamp-2'>{comment.content}</p>
                      </Table.Cell>
                      <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          </div>
          <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
            <div className='flex justify-between  p-3 text-sm font-semibold'>
              <h1 className='text-center p-2'>Recent Books' Post</h1>
              <Button outline gradientDuoTone='purpleToPink'>
                <Link to={"/dashboard?tab=books"}>See all</Link>
              </Button>
            </div>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Book image</Table.HeadCell>
                <Table.HeadCell>Book Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
              </Table.Head>
              {posts &&
                posts.map((post) => (
                  <Table.Body key={post._id} className='divide-y'>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell>
                        <img
                          src={post.image}
                          alt='user'
                          className='w-10 h-14 rounded-md bg-gray-500'
                        />
                      </Table.Cell>
                      <Table.Cell className='w-96'>{post.title}</Table.Cell>
                      <Table.Cell className='w-5'>{post.category}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          </div>
        </div>
      </div>
    </>
  ) : (
    <StudentDashboardComp />
  );
}
