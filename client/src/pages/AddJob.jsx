import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill CSS
import { JobCategories, JobLocations } from "../assets/assets";
import axios from "axios";
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

  const { backendUrl, companyToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const description = quillRef.current.root.innerHTML;
      // Validate description is not empty or just whitespace/HTML tags
      const plainText = quillRef.current.getText().trim();
      if (!plainText) {
        toast.error("Please enter a job description.");
        return;
      }
      const { data } = await axios.post(
        backendUrl + "/api/company/post-job",
        {
          title,
          description,
          location,
          salary,
          category,
          level,
        },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setSalary(0);
        quillRef.current.root.innerHTML = "";
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Enter the job description here..."
      });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="container p-2 sm:p-4 flex flex-col w-full items-center gap-4"
    >
      {/* Job Title */}
      <div className="w-full max-w-lg">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Job Title
        </label>
        <input
          className="w-full px-3 py-2 border-2 border-gray-300 rounded text-sm"
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
          className="border-2 border-gray-300 rounded p-2 min-h-[120px] text-sm"
        ></div>
        <div className="text-xs text-gray-400 mt-1">
          Example: Describe the role, expectations, and company culture.<br/>
          <b>Key Responsibilities:</b> <i>List main duties</i><br/>
          <b>Skills Required:</b> <i>List required skills</i>
        </div>
      </div>

      {/* Dropdown Fields */}
      <div className="flex flex-col gap-4 w-full max-w-lg sm:flex-row sm:gap-4">
        <div className="w-full">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Job Category
          </label>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded text-sm"
            value={category}
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
            className="w-full px-3 py-2 border-2 border-gray-300 rounded text-sm"
            value={location}
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
            className="w-full px-3 py-2 border-2 border-gray-300 rounded text-sm"
            value={level}
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
          className="w-full px-3 py-2 border-2 border-gray-300 rounded text-sm"
          type="number"
          placeholder="0"
          onChange={(e) => setSalary(Number(e.target.value))}
          value={salary}
        />
      </div>

      {/* Add Button */}
      <button
        type="submit"
        className="px-6 py-2 bg-black text-white font-medium rounded w-full max-w-lg text-center"
      >
        ADD
      </button>
    </form>
  );
};

export default AddJob;