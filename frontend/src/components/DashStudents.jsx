import { Tabs } from "flowbite-react";
import IssuedBookToStudents from "../pages/students/IssuedBookToStudents";
import IssueBooks from "../pages/students/IssueBooks";
import ReturnedBooks from "../pages/students/ReturnedBooks";
import { GiWhiteBook, GiBookshelf, GiSpellBook } from "react-icons/gi";

export default function DashStudents() {
  return (
    <Tabs
      aria-label='Tabs with underline'
      style='underline'
      className=' bg-white dark:bg-black w-full'
    >
      <Tabs.Item active title='Recent Issued Books' icon={GiBookshelf}>
        <IssuedBookToStudents />
      </Tabs.Item>

      <Tabs.Item title='Issue Books' icon={GiSpellBook}>
        <IssueBooks />
      </Tabs.Item>

      <Tabs.Item title='Returned Books' icon={GiWhiteBook}>
        <ReturnedBooks />
      </Tabs.Item>
    </Tabs>
  );
}
