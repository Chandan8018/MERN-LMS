import React, { useEffect, useState } from "react";
import { HiArrowNarrowUp, HiDocumentText } from "react-icons/hi";
import { GiBookshelf } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";

export default function StudentDashboardComp() {
  const { currentUser } = useSelector((state) => state.user);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [totalFines, setTotalFines] = useState(0);

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
        const res = await fetch(
          `/api/student/getstudentborrowbooks?studentId=${currentUser._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setBorrowedBooks(data.borrowBooks);
          setTotalBorrowedBooks(data.totalBooksBorrow);
          calculatTotalFines();
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
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser) {
      fetchBorrowedBooks();
      fetchPosts();
    }
  }, [currentUser, totalBorrowedBooks]);

  return (
    <div className='p-3 md:mx-auto w-full bg-white dark:bg-black dark:text-white'>
      <div className='flex-wrap flex gap-4 justify-center'>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>
                Total Borrowed Books
              </h3>
              <p className='text-2xl'>{totalBorrowedBooks}</p>
            </div>
            <GiBookshelf className='bg-teal-600  text-white rounded text-5xl p-3 shadow-lg' />
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Total Fines</h3>
              <p className='text-2xl'>₹ {totalFines}</p>
            </div>
            <FaRupeeSign className='bg-indigo-600  text-white rounded text-5xl p-3 shadow-lg' />
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
            <HiDocumentText className='bg-lime-600  text-white rounded text-5xl p-3 shadow-lg' />
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

      <div className='flex flex-col overflow-x-scroll w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800 mt-5'>
        <div className='flex justify-between  p-3 text-sm font-semibold'>
          <h1 className='text-center p-2'>Borrowed Books' List</h1>
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Book image</Table.HeadCell>
            <Table.HeadCell>Book Title</Table.HeadCell>
            <Table.HeadCell>Borrowed Date</Table.HeadCell>
            <Table.HeadCell>Return Date</Table.HeadCell>
            <Table.HeadCell>Fine Amount</Table.HeadCell>
          </Table.Head>
          {borrowedBooks &&
            borrowedBooks.map((borrowedBook) => (
              <Table.Body key={borrowedBook._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    <img
                      src={borrowedBook.bookImage}
                      alt='user'
                      className='w-10 h-14 rounded-md bg-gray-500'
                    />
                  </Table.Cell>
                  <Table.Cell className='w-96'>
                    {borrowedBook.bookname}
                  </Table.Cell>
                  <Table.Cell className='w-5'>
                    {new Date(borrowedBook.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {handleReturnDate(borrowedBook.updatedAt)}
                  </Table.Cell>
                  <Table.Cell>
                    {handleFine(handleReturnDate(borrowedBook.updatedAt))}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
        </Table>
      </div>
    </div>
  );
}
