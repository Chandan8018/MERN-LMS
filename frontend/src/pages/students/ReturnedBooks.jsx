import { Alert, Button, Modal, Table, TextInput } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ReturnedBooks() {
  const { currentUser } = useSelector((state) => state.user);
  const [regdNumber, setRegdNumber] = useState("");
  const [studentBorrowBooks, setStudentBorrowBooks] = useState([]);
  const [searchByRegd, setSearchByRegd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [BorrowBookId, setBorrowBookId] = useState(null);
  const [returnError, setReturnError] = useState(null);
  const [bookReturnUnsuccessfully, setBookReturnUnsuccessfully] =
    useState(false);
  const [bookReturnedSuccessfully, setBookReturnedSuccessfully] =
    useState(false);
  const [bookData, setBookData] = useState({});

  const handelBorrowBook = async () => {
    try {
      const res = await fetch(`/api/student/getstudents/${regdNumber}`);
      const data = await res.json();
      if (res.ok) {
        setStudentBorrowBooks(data);
        setSearchByRegd(true);
      }
    } catch (error) {
      setReturnError(error.message);
      setBookReturnUnsuccessfully(true);
    }
  };

  const returnDate = (date) => {
    const borrowDate = new Date(date);
    const timestampAfter15Days =
      borrowDate.getTime() + 15 * 24 * 60 * 60 * 1000;
    const dateAfter15Days = new Date(timestampAfter15Days);
    const localizedDateAfter15Days = dateAfter15Days.toLocaleDateString();
    return localizedDateAfter15Days;
  };

  const handleReturnBook = async () => {
    try {
      const res = await fetch(`/api/student/return/${BorrowBookId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setStudentBorrowBooks((prev) =>
          prev.filter(
            (studentBorrowBooks) => studentBorrowBooks._id !== BorrowBookId
          )
        );
        setShowModal(false);
        setBookReturnedSuccessfully(true);
      } else {
        setReturnError(data.message);
        setBookReturnUnsuccessfully(true);
      }
    } catch (error) {
      setReturnError(error.message);
      setBookReturnUnsuccessfully(true);
    }
  };

  const handelBookQty = async (bookId) => {
    try {
      const res = await fetch(`/api/post/${bookId}`);
      const data = await res.json();
      if (res.ok) {
        setBookData(data);
      }
    } catch (error) {
      setReturnError(error.message);
    }
  };

  const handleBookQtyUpdate = async () => {
    try {
      const res = await fetch(
        `/api/post/updatebook/${bookData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            qty: bookData.qty + 1,
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
    <div className=' '>
      <div className='max-w-md mx-auto flex my-5'>
        <TextInput
          id='search'
          type='text'
          placeholder='Enter Student Library Card Number here...'
          required
          style={{
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
          className=' flex-1 outline-none'
          value={regdNumber}
          onChange={(e) => {
            setRegdNumber(e.target.value);
            setSearchByRegd(false);
            setBookReturnedSuccessfully(false);
            setBookReturnUnsuccessfully(false);
          }}
        />
        <Button
          type='button'
          gradientDuoTone='purpleToPink'
          className='rounded-l-none flex-4 outline-none'
          onClick={handelBorrowBook}
        >
          search
        </Button>
      </div>
      {bookReturnedSuccessfully && (
        <Alert className='my-5' color='success'>
          Book Returned Successfully
        </Alert>
      )}
      {bookReturnUnsuccessfully && (
        <Alert className='my-5' color='failure'>
          {returnError}
        </Alert>
      )}
      <div className=' md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
        {currentUser.isAdmin && searchByRegd && (
          <Table hoverable className='shadow-md mt-5'>
            <Table.Head>
              <Table.HeadCell>Lib. Card no</Table.HeadCell>
              <Table.HeadCell>Students Image</Table.HeadCell>
              <Table.HeadCell>Students Name</Table.HeadCell>
              <Table.HeadCell>Books Image</Table.HeadCell>
              <Table.HeadCell>Books Name</Table.HeadCell>
              <Table.HeadCell>Borrow Date</Table.HeadCell>
              <Table.HeadCell>Return Date</Table.HeadCell>
              <Table.HeadCell>Qyt</Table.HeadCell>
              <Table.HeadCell>Return</Table.HeadCell>
            </Table.Head>
            {studentBorrowBooks.map((borrowBook) => (
              <>
                <Table.Body className='divide-y' key={borrowBook._id}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 '>
                    <Table.Cell>{borrowBook.regdNumber}</Table.Cell>
                    <Table.Cell>
                      <img
                        src={borrowBook.studentImage}
                        alt={borrowBook.studentName}
                        className='w-10 md:w-20 object-cover bg-gray-500 rounded-xl shadow-xl shadow-slate-700'
                      />
                    </Table.Cell>
                    <Table.Cell>{borrowBook.studentName}</Table.Cell>
                    <Table.Cell>
                      <img
                        src={borrowBook.bookImage}
                        alt={borrowBook.bookname}
                        className='w-10 md:w-20 object-cover bg-gray-500 rounded-xl shadow-xl shadow-slate-700'
                      />
                    </Table.Cell>
                    <Table.Cell>{borrowBook.bookname}</Table.Cell>
                    <Table.Cell>
                      {new Date(borrowBook.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{returnDate(borrowBook.updatedAt)}</Table.Cell>
                    <Table.Cell>{borrowBook.quantity}</Table.Cell>
                    <Table.Cell>
                      <Button
                        gradientDuoTone='purpleToPink'
                        onClick={() => {
                          setBorrowBookId(borrowBook._id);
                          handelBookQty(borrowBook.bookId);
                          setBookReturnedSuccessfully(false);
                          setShowModal(true);
                        }}
                      >
                        Return
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </>
            ))}
          </Table>
        )}
      </div>
      {/* Modal */}
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
              Are you sure this student wants to return this book?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button
                color='failure'
                onClick={() => {
                  setShowModal(false);
                  handleReturnBook();
                  handleBookQtyUpdate();
                }}
              >
                Yes, I'm sure
              </Button>
              <Button
                color='gray'
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
  );
}
