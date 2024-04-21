import { Alert, Banner, Button, Table, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function IssueBooks() {
  const [regdNumber, setRegdNumber] = useState("");
  const [user, setUser] = useState({});
  const [findUser, setFindUser] = useState(false);
  const [selectBooks, setSelectBooks] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const [borrowBookId, setBorrowBookId] = useState("");
  const [bookAndUserDetails, setBookAndUserDetails] = useState({});
  const handleSearch = async () => {
    try {
      const res = await fetch(`/api/user/search/${regdNumber}`);
      const data = await res.json();
      if (res.ok) {
        setFindUser(true);
        setUser(data);
      }
    } catch (error) {
      console.log(error.message);
      setFindUser(false);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, [selectBooks]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchBorrowedBook = async () => {
      setSelectBooks(false);
      try {
        const res = await fetch(`/api/post/${borrowBookId}`);
        const data = await res.json();
        if (res.ok) {
          setBookAndUserDetails({ ...data, ...user });
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchBorrowedBook();
  }, [borrowBookId]);

  return (
    <div className=' mx-auto'>
      <div className='max-w-md mx-auto flex my-5'>
        <TextInput
          id='search'
          type='text'
          placeholder='Enter Student Registration Number here...'
          required
          style={{
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
          className=' flex-1 outline-none'
          value={regdNumber}
          onChange={(e) => setRegdNumber(e.target.value)}
        />
        <Button
          type='button'
          gradientDuoTone='purpleToPink'
          className='rounded-l-none flex-4 outline-none'
          onClick={handleSearch}
        >
          search
        </Button>
      </div>
      <div className='table-auto overflow-x-auto overflow-y-hidden md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
        {findUser && (
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Registration Number</Table.HeadCell>
              <Table.HeadCell>Assign Book</Table.HeadCell>
            </Table.Head>

            <Table.Body className='divide-y'>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>
                  <img
                    src={user.profilePicture}
                    alt='user'
                    className='w-10 h-10 rounded-full bg-gray-500'
                  />
                </Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.regdNumber}</Table.Cell>
                <Table.Cell>
                  <Button
                    type='button'
                    gradientDuoTone='purpleToPink'
                    onClick={() => setSelectBooks(true)}
                  >
                    Select Book
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        )}

        {selectBooks && (
          <>
            <Table hoverable className='shadow-md mt-5'>
              <Table.Head>
                <Table.HeadCell>Book Cover</Table.HeadCell>
                <Table.HeadCell>Book Name</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Author</Table.HeadCell>
                <Table.HeadCell>Quantity</Table.HeadCell>
                <Table.HeadCell>Assign to Student</Table.HeadCell>
              </Table.Head>
              {userPosts.map((post) => (
                <Table.Body className='divide-y' key={post._id}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 '>
                    <Table.Cell>
                      <Link
                        to={`/book-post/${post.slug}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          className='w-10 md:w-20 object-cover bg-gray-500 rounded-xl shadow-xl shadow-slate-700'
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className='font-medium text-gray-900 dark:text-white'
                        to={`/book-post/${post.slug}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell>{post.authorname}</Table.Cell>
                    <Table.Cell>{post.qty}</Table.Cell>
                    <Table.Cell>
                      <Button
                        type='button'
                        gradientDuoTone='purpleToPink'
                        onClick={() => setBorrowBookId(post._id)}
                      >
                        Assign
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
            {showMore && (
              <button
                onClick={handleShowMore}
                className='w-full text-black dark:text-teal-500 font-bold self-center text-sm py-7 hover:text-blue-600'
              >
                Show more
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
