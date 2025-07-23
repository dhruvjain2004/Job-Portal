import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets"; // Adjust the path as necessary
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { setShowRecruiterLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center relative">
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/') }>
          <img src={assets.vite_logo} alt="NaukriVerse Symbol" height={40} width={40} />
          <span className="font-bold text-xl ml-2">NaukriVerse</span>
        </div>
        {/* Hamburger for mobile */}
        <button className="sm:hidden ml-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        {/* Desktop menu */}
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <>
              <Link to={"/applications"}>Applied Jobs</Link>
              <p>|</p>
              <Link to="/dashboard" className="bg-gray-800 text-white px-4 py-2 rounded">Dashboard</Link>
              <p>Hi, {user.firstName + " " + user.lastName}</p>
              <UserButton />
            </>
          ) : (
            <>
              <Link to="/dashboard" className="bg-gray-800 text-white px-4 py-2 rounded">Dashboard</Link>
              <button className="text-gray-600" onClick={() => setShowRecruiterLogin(true)}>Recruiter Login</button>
              <button
                onClick={() => openSignIn()}
                className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
              >
                Login
              </button>
            </>
          )}
        </div>
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-16 right-4 bg-white shadow-lg rounded p-4 flex flex-col gap-3 w-48 z-50 sm:hidden animate-fade-in">
            {user ? (
              <>
                <Link to={"/applications"} onClick={()=>setMobileMenuOpen(false)}>Applied Jobs</Link>
                <Link to="/dashboard" className="bg-gray-800 text-white px-4 py-2 rounded" onClick={()=>setMobileMenuOpen(false)}>Dashboard</Link>
                <span className="text-gray-700">Hi, {user.firstName + " " + user.lastName}</span>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <Link to="/dashboard" className="bg-gray-800 text-white px-4 py-2 rounded" onClick={()=>setMobileMenuOpen(false)}>Dashboard</Link>
                <button className="text-gray-600 text-left" onClick={()=>{setShowRecruiterLogin(true);setMobileMenuOpen(false);}}>Recruiter Login</button>
                <button
                  onClick={()=>{openSignIn();setMobileMenuOpen(false);}}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full w-full text-left"
                >
                  Login
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
