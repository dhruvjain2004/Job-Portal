import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill CSS
import { JobCategories, JobLocations } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const AddJob = () => {

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Designing");
  const [level, setLevel] = useState("Beginner level");
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const { setJobs, jobs } = useContext(AppContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const description = quillRef.current.root.innerHTML;
    const newJob = {
      _id: (jobs.length + 1).toString(),
      title,
      location,
      level,
      companyId: {
        _id: "demo-company-id",
        name: "Demo Company",
        email: "demo@company.com",
        image: "",
      },
      description,
      salary,
      date: Date.now(),
      category,
    };
    setJobs([...jobs, newJob]);
    toast.success("Job added!");
    setTitle("");
    setSalary(0);
    quillRef.current.root.innerHTML = "";
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);
  

  return (
    <form onSubmit={onSubmitHandler} className="container p-4 flex flex-col w-full items-center gap-4">
      {/* Job Title */}
      <div className="w-full max-w-lg">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Job Title
        </label>
        <input
          className="w-full px-3 py-2 border-2 border-gray-300 rounded"
          type="text"
          placeholder="Type here"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
      </div>

      {/* Job Description */}
      <div className="w-full max-w-lg">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Job Description
        </label>
        <div
          ref={editorRef}
          className="border-2 border-gray-300 rounded p-2"
        ></div>
      </div>

      {/* Dropdown Fields */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
        <div className="w-full">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Job Category
          </label>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            onChange={(e) => setCategory(e.target.value)}
          >
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Job Location
          </label>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            onChange={(e) => setLocation(e.target.value)}
          >
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Job Level
          </label>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
          </select>
        </div>
      </div>

      {/* Job Salary */}
      <div className="w-full max-w-lg">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Job Salary
        </label>
        <input
          className="w-full px-3 py-2 border-2 border-gray-300 rounded"
          type="number"
          placeholder="0"
          onChange={(e) => setSalary(e.target.value)}
          value={salary}
        />
      </div>

      {/* Add Button */}
      <button
        type="submit"
        className="px-6 py-2 bg-black text-white font-medium rounded"
      >
        ADD
      </button>
    </form>
  );
};

export default AddJob;