import React, { useContext, useEffect, useState, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);

  // Ref to scroll to the job list section
  const jobListRef = useRef(null);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((c) => c !== location) : [...prev, location]
    );
  };

  useEffect(() => {
    let filtered = jobs.slice().reverse();
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(job => selectedCategories.includes(job.category));
    }
    if (selectedLocations.length > 0) {
      filtered = filtered.filter(job => selectedLocations.includes(job.location));
    }
    // Improved search logic
    const titleSearch = searchFilter.title ? searchFilter.title.trim().toLowerCase() : '';
    const locationSearch = searchFilter.location ? searchFilter.location.trim().toLowerCase() : '';
    const companyNameSearch = searchFilter.title ? searchFilter.title.trim().toLowerCase() : '';
    if (isSearched && (titleSearch || locationSearch)) {
      filtered = filtered.filter(job => {
        const titleMatch = titleSearch ? job.title.toLowerCase().includes(titleSearch) : true;
        const locationMatch = locationSearch ? job.location.toLowerCase().includes(locationSearch) : true;
        const companyNameMatch = companyNameSearch ? (job.companyId?.name || '').toLowerCase().includes(companyNameSearch) : true;
        return (titleMatch || companyNameMatch) && locationMatch;
      });
    }
    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [jobs, selectedCategories, selectedLocations, searchFilter, isSearched]);

  // Reset filters when search is cleared
  useEffect(() => {
    if (!isSearched && selectedCategories.length === 0 && selectedLocations.length === 0) {
      setFilteredJobs(jobs.slice().reverse());
    }
  }, [isSearched, jobs]);

  // Function to handle page change and scroll to job list
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to the job list section
    if (jobListRef.current) {
      jobListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const jobsPerPage = 12;
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-4 sm:py-8 ">
      {/* Side bar */}
      <div className="w-full lg:w-1/4 p-2 sm:p-4 bg-white">
        {/* Search Filter from Hero Component */}
        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="font-medium text-base sm:text-lg mb-4">Current Search</h3>
              <div className="mb-4 text-gray-600 text-xs sm:text-base">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-2 sm:px-4 py-1.5 rounded">
                    {searchFilter.title}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}

                {searchFilter.location && (
                  <span className="ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-2 sm:px-4 py-1.5 rounded">
                    {searchFilter.location}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
              </div>
            </>
          )}

        {/* filter button */}
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="px-6 py-1.5 rounded border border-gray-400 lg:hidden mb-2 text-xs"
        >
          {showFilter ? "Close" : "Filters"}
        </button>

        {/* Category Filter */}
        <div className={showFilter ? " " : "max-lg:hidden"}>
          <h4 className="font-medium text-base sm:text-lg py-4">Search by Categories</h4>
          <ul className="space-y-2 sm:space-y-4 text-gray-600 text-xs sm:text-base">
            {JobCategories.map((category, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  onChange={() => handleCategoryChange(category)}
                  className="scale-110 sm:scale-125 accent-blue-500"
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Location Flter */}
        <div className={showFilter ? " " : "max-lg:hidden"}>
          <h4 className="font-medium text-base sm:text-lg py-4 pt-8 sm:pt-14">Search by Location</h4>
          <ul className="space-y-2 sm:space-y-4 text-gray-600 text-xs sm:text-base">
            {JobLocations.map((location, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  className="scale-110 sm:scale-125 accent-blue-500"
                  type="checkbox"
                  onChange={() => handleLocationChange(location)}
                  checked={selectedLocations.includes(location)}
                />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Job Listings */}
      <section ref={jobListRef} className="w-full lg:w-3/4 text-gray-800 max-lg:px-2 sm:max-lg:px-4">
        <h3 className="font-medium text-2xl sm:text-3xl py-2">Latest Jobs</h3>
        <p className="mb-4 sm:mb-8 text-xs sm:text-base">Get your desired job from top companies</p>
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {paginatedJobs.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500 py-10">No jobs found.</div>
          ) : (
            paginatedJobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))
          )}
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;