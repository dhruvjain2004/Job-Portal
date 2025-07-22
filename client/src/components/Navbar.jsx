import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets"; // Adjust the path as necessary
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { setShowRecruiterLogin } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img src={assets.logo} alt="Logo" style={{ cursor: 'pointer' }} height={60} width={250} onClick={() => navigate('/')} />
        {user ? 
          <div className="flex items-center gap-3">
            <Link to={"/applications"}>Applied Jobs</Link>
            <p>|</p>
            <Link to="/dashboard" className="bg-gray-800 text-white px-4 py-2 rounded">Dashboard</Link>
            <p>Hi, {user.firstName + " " + user.lastName}</p>
            <UserButton />
          </div>
         : 
          <div className="flex gap-4 max-sm:text-sm">
            <Link to="/dashboard" className="bg-gray-800 text-white px-4 py-2 rounded">Dashboard</Link>
            <button className="text-gray-600" onClick={() => setShowRecruiterLogin(true)}>Recruiter Login</button>
            <button
              onClick={() => openSignIn()}
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
            >
              Login
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default Navbar;
