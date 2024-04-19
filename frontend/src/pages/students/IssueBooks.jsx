import { Button, Table, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import React from "react";

export default function IssueBooks() {
  return (
    <div className=' mx-auto'>
      <div className='max-w-md mx-auto flex my-5'>
        <TextInput
          id='search'
          type='text'
          placeholder='Enter Student Registration Number here...'
          required
          style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          className=' flex-1'
        />
        <Button
          type='button'
          gradientDuoTone='purpleToPink'
          className='rounded-l-none flex-4'
        >
          search
        </Button>
      </div>
      <Table hoverable className='shadow-md'>
        <Table.Head>
          <Table.HeadCell>Date updated</Table.HeadCell>
          <Table.HeadCell>Book Cover</Table.HeadCell>
          <Table.HeadCell>Book Name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Available Copies</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          <Table.HeadCell>
            <span> Edit </span>
          </Table.HeadCell>
        </Table.Head>
      </Table>
    </div>
  );
}
