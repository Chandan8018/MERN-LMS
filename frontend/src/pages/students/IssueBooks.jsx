import { Alert, Button, Modal, Table, TextInput } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function IssueBooks() {
  const { currentUser } = useSelector((state) => state.user);
  const [regdNumber, setRegdNumber] = useState("");
  const [user, setUser] = useState({});
  const [findUser, setFindUser] = useState(false);
  const [selectBooks, setSelectBooks] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [borrowBookDetails, setBorrowBookDetails] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [bookIssueUnsuccessfully, setBookIssueUnsuccessfully] = useState(false);
  const [bookIssuedSuccessfully, setBookIssuedSuccessfully] = useState(false);
  const [showModal, setShowModal] = useState(false);

  //fetch student by using regd number
  const handleSearch = async () => {
    try {
      const res = await fetch(`/api/user/search/${regdNumber}`);
      const data = await res.json();
      if (res.ok) {
        setFindUser(true);
        setUser(data);
      }
    } catch (error) {
      setPublishError(error.message);
      setFindUser(false);
    }
  };

  //fetch all books from data base
  const handleFetchPosts = async () => {
    setSelectBooks(true);
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
      setPublishError(error.message);
    }
  };

  //handle show more button
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
      setPublishError(error.message);
    }
  };

  //get book details by using book id
  const handelBorrowedBook = async (borrowBookId) => {
    if (!borrowBookId) return;
    setSelectBooks(false);
    try {
      const res = await fetch(`/api/post/${borrowBookId}`);
      const data = await res.json();
      if (res.ok) {
        setBorrowBookDetails(data);
      }
    } catch (error) {
      setPublishError(error.message);
    }
  };

  // create student details and borrow book details docoment in mongo db
  const handleUploadDataInDatabase = async () => {
    try {
      const res = await fetch("/api/student/borrowbook/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: user._id,
          studentName: user.username,
          studentImage: user.profilePicture,
          bookId: borrowBookDetails._id,
          bookname: borrowBookDetails.title,
          bookImage: borrowBookDetails.image,
          ISBN: borrowBookDetails.ISBN,
          authorname: borrowBookDetails.authorname,
          quantity: 1,
          status: "borrowed",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setBookIssueUnsuccessfully(true);
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setBookIssueUnsuccessfully(false);
        setPublishError(null);
        setFindUser(false);
        setBookIssuedSuccessfully(true);
        setRegdNumber("");
        setShowModal(false);
      }
    } catch (error) {
      setBookIssueUnsuccessfully(true);
      setPublishError("Something went wrong last", error);
    }
  };

  //After student borrow book update book quantity in mongo db
  const handleBookQtyUpdate = async () => {
    console.log(borrowBookDetails._id);
    if (!borrowBookDetails._id) return;
    try {
      const res = await fetch(
        `/api/post/updatebook/${borrowBookDetails._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            qty: borrowBookDetails.qty - 1,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

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
          onChange={(e) => {
            setBookIssuedSuccessfully(false);
            setRegdNumber(e.target.value);
          }}
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
      {bookIssuedSuccessfully && (
        <Alert className='my-5' color='success'>
          Book Issued Successfully
        </Alert>
      )}
      {bookIssueUnsuccessfully && (
        <Alert className='my-5' color='failure'>
          {publishError}
        </Alert>
      )}
      <div className='table-auto overflow-x-auto overflow-y-hidden md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
        {findUser && (
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Student image</Table.HeadCell>
              <Table.HeadCell>Student Name</Table.HeadCell>
              <Table.HeadCell>Registration Number</Table.HeadCell>
              <Table.HeadCell>Select Book</Table.HeadCell>
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
                    onClick={handleFetchPosts}
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
                        onClick={() => {
                          setShowModal(true);
                          handelBorrowedBook(post._id);
                        }}
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

        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size='md'
        >
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Are you sure you want to assign this book to {user.username}?
              </h3>
              <div className='flex justify-center gap-4'>
                <Button
                  color='success'
                  onClick={() => {
                    handleBookQtyUpdate();
                    handleUploadDataInDatabase();
                    setShowModal(false);
                  }}
                >
                  Yes, I'm sure
                </Button>
                <Button
                  color='failure'
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
