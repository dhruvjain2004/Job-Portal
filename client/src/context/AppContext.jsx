import { createContext, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { jobsData } from "../assets/assets";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const { user } = useUser();

  const [searchFilter, setSearchFilter] = useState({ title: "", location: "" });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState(jobsData);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [userData, setUserData] = useState({});
  const [userApplications, setUserApplications] = useState([]);

  // Set userData from Clerk user object
  useEffect(() => {
    if (user) {
      setUserData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses?.[0]?.emailAddress || "",
        imageUrl: user.imageUrl,
        resume: "", // or a mock value
      });
    } else {
      setUserData({});
    }
  }, [user]);

  const value = {
    setSearchFilter,
    searchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    userData,
    setUserData,
    userApplications,
    setUserApplications,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};