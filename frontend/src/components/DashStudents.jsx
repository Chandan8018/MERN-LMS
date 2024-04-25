import { Tabs } from "flowbite-react";
import IssuedBookToStudents from "../pages/students/IssuedBookToStudents";
import IssueBooks from "../pages/students/IssueBooks";
import ReturnedBooks from "../pages/students/ReturnedBooks";
import { GiWhiteBook, GiBookshelf, GiSpellBook } from "react-icons/gi";
import { useState } from "react";

export default function DashStudents() {
  return (
    <div className='overflow-x-auto w-full '>
      <Tabs aria-label='Default tabs' style='fullWidth'>
        <Tabs.Item active title='Books borrowed by students' icon={GiBookshelf}>
          <h1 className='text-xl md:text-2xl font-bold mt-5 text-center'>
            <span className=' text-teal-400'>✦✦</span> Details of all books
            borrowed by students
            <span className=' text-teal-500'> ✦✦</span>
          </h1>
          <IssuedBookToStudents />
        </Tabs.Item>

        <Tabs.Item title='Issuing book to student' icon={GiSpellBook}>
          <h1 className='text-xl md:text-2xl font-bold text-center'>
            <span className=' text-teal-400'>✦✦</span> Add book to students'
            borrowing list
            <span className=' text-teal-500'> ✦✦</span>
          </h1>
          <IssueBooks />
        </Tabs.Item>

        <Tabs.Item title='Return of books' icon={GiWhiteBook}>
          <h1 className='text-xl md:text-2xl font-bold text-center'>
            <span className=' text-teal-400'>✦✦</span> Return book from
            students' borrowed list
            <span className=' text-teal-500'> ✦✦</span>
          </h1>
          <ReturnedBooks />
        </Tabs.Item>
      </Tabs>
    </div>
  );
}
