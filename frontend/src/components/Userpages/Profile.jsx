import React from "react";
import { useSelector } from "react-redux";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import ChangePassword from "./ChangePassword";

const Profile = () => {
  const users = useSelector((state) => state.user);
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="bg-sky-300 rounded-lg shadow-md p-8 w-full md:w-96">
          <h1 className="font-bold text-2xl mb-4">My Account Details</h1>
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-sky-300 ring-offset-base-100 ring-offset-2">
              <img src="https://res.cloudinary.com/dsyln8j3g/image/upload/v1687673666/v6oroggh6vs5dtgha7u9.webp" />
            </div>
          </div>

          <h2 className="text-lg mt-4 mb-2">Name:</h2>
          <input type="text" value={users.name} className="input mb-4" />

          <h2 className="text-lg mt-4 mb-2 w-44">Phone:</h2>
          <input type="text" value={users.phone} className="input mb-4" />

          <h2 className="text-lg mt-4 mb-2">Email:</h2>
          <input type="email" value={users.email} className="input mb-4" />

          <div className="w-1/2 text-center flex justify-center items-center">
            <label
              htmlFor="chngepass"
              className="cursor-pointer font-bold underline underline-offset-4"
            >
              Change Password
            </label>
           
          </div>
        </div>
      </div>
   <ChangePassword/>
      <Footer />
    </div>
  );
};

export default Profile;
