import React from "react";
import { Card, Avatar } from "flowbite-react";
import { useState } from "react";

export default function EmployeeSlider() {
  const employees = [
    {
      id: 1,
      name: "Angadi dileep kumar",
      photo:
        "https://img.freepik.com/premium-vector/businessman-avatar-cartoon-character-profile_18591-50581.jpg",
      position: "Project Manager",
      description: "Angadi dileep is the Project Manager.",
    },
    {
      id: 2,
      name: "Chandan Kumar Sahoo",
      photo:
        "https://firebasestorage.googleapis.com/v0/b/mern-lms-5f11d.appspot.com/o/17141154436691711086095883.jpg?alt=media&token=5afaf5b0-c7d4-4676-b7f9-f19b7bfc1623",
      position: "MERN Stack Developer",
      description: "Chandan is the UX Designer of the project.",
    },
    {
      id: 3,
      name: "Sukhjiwan Singh",
      photo:
        "https://firebasestorage.googleapis.com/v0/b/mern-lms-5f11d.appspot.com/o/1714582499383photo.jpg?alt=media&token=b26b3c03-bf4c-4601-b5c7-2340e92ca697",
      position: "Tester",
      description: "Sukhjiwan Singh is the tester of the project.",
    },
    {
      id: 4,
      name: "Bhupinder Singh",
      photo:
        "https://img.freepik.com/premium-vector/businessman-avatar-cartoon-character-profile_18591-50581.jpg",
      position: "Designer",
      description: "Bhupinder is the Designer of the project.",
    },

    {
      id: 5,
      name: "Pawanjeet Singh",
      photo:
        "https://img.freepik.com/premium-vector/businessman-avatar-cartoon-character-profile_18591-50581.jpg",
      position: "Designer",
      description: "Pawanjeet is the Designer of the project",
    },
    {
      id: 6,
      name: "Obair nisar najar",
      photo:
        "https://img.freepik.com/premium-vector/businessman-avatar-cartoon-character-profile_18591-50581.jpg",
      position: "Frontend Designer",
      description: "Obair is the Frontend Designer of the project.",
    },
    {
      id: 7,
      name: "Anwar khan",
      photo:
        "https://img.freepik.com/premium-vector/businessman-avatar-cartoon-character-profile_18591-50581.jpg",
      position: "UX Designer",
      description: "Anwar is the UX Designer of the project.",
    },

    // Add more shareholders as needed
  ];

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleDetails = () => setIsExpanded(!isExpanded);

  return (
    <div className=' pb-5'>
      <h4 className='heading'>Our Team</h4>
      <div className='flex justify-evenly pb-5 min-w-full overflow-x-auto ... '>
        {employees.map((employee) => (
          <Card
            key={employee.id}
            className='min-w-52 bg-base-100 shadow-xl mx-5 flex flex-col items-center'
          >
            <Avatar
              alt={employee.name}
              img={employee.photo}
              size='xl'
              className='w-32 h-40'
              rounded
            />
            <div>
              <h5 className='font-bold dark:text-white'>{employee.name}</h5>
              <p className='text-sm text-gray-500 dark:text-white'>
                {employee.position}
              </p>
            </div>
            <button
              onClick={toggleDetails}
              className={`text-sm pl-10 ${
                isExpanded ? "text-blue-500" : "text-gray-500"
              }`}
            >
              {isExpanded ? "Hide Details" : "Show Details"}
            </button>

            {isExpanded && (
              <p className='p-4 dark:text-white'>{employee.description}</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
