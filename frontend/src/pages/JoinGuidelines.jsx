// JoinGuidelines.js
import React from "react";

const JoinGuidelines = () => {
  return (
    <section className="join-guidelines py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">
          How to Join Our Library
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                Step 1: Visit Our Library Website
              </h3>
              <p className="text-gray-700">
                Come to our library website during operating hours to sign up
                your membership.
              </p>
            </div>
          </div>
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                Step 2: Fill Out Membership Form
              </h3>
              <p className="text-gray-700">
                Fill out our membership form with your details and preferences.
              </p>
            </div>
          </div>
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                Step 3: Update your profile with secure information.
              </h3>
              <p className="text-gray-700">
                Update your profile with accurate and up-to-date information.
              </p>
            </div>
          </div>
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                Step 4: Read your favorite books.
              </h3>
              <p className="text-gray-700">
                Add your favorite books to your borrowing history.
              </p>
            </div>
          </div>
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                Step 5: Don't forget write review on books.
              </h3>
              <p className="text-gray-700">
                Review your books to ensure they are in good condition.
              </p>
            </div>
          </div>
          {/* Add more steps as needed */}
        </div>
      </div>
    </section>
  );
};

export default JoinGuidelines;
