import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function IssuedBookToStudents() {
  const { currentUser } = useSelector((state) => state.user);
  const [studentBorrowBooks, setStudentBorrowBooks] = useState([]);
  const [showMore, setShowMore] = useState(true);
  console.log(studentBorrowBooks);
  useEffect(() => {
    const fetchBorrowBooks = async () => {
      try {
        const res = await fetch(`/api/student/getstudentborrowbooks`);
        const data = await res.json();
        if (res.ok) {
          setStudentBorrowBooks(data.borrowBooks);
          if (data.borrowBooks.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser) {
      fetchBorrowBooks();
    }
  }, []);

  const handleShowMore = async () => {
    const startIndex = setStudentBorrowBooks.length;
    try {
      const res = await fetch(
        `/api/student/getstudentborrowbooks?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setStudentBorrowBooks((prev) => [...prev, ...data.borrowBooks]);
        if (data.borrowBooks.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
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

  return (
    <div className='overflow-x-auto overflow-y-hidden md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && studentBorrowBooks.length > 0 ? (
        <>
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
            </Table.Head>
            {studentBorrowBooks.map((borrowBook) => (
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
      ) : (
        <h1 className=' flex items-center justify-center text-xl md:text-2xl font-bold mt-5 '>
          No books have been issued to the students.
        </h1>
      )}
    </div>
  );
}
