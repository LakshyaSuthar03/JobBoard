import React, { useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";

const PostJob = () => {
  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });
  const handlePostJob = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/job", job)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <NavBar />
      <div className="w-full h-auto flex content-center items-center justify-center my-14">
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="title"
                type="text"
                onChange={(e) => setJob({ ...job, title: e.target.value })}
                placeholder="Software Engineer"
              />
            </div>
            <div className="w-full  px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                name="postContent"
                className="appearance-none block w-full h-36 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"
                id="description"
                type="textarea"
                onChange={(e) =>
                  setJob({ ...job, description: e.target.value })
                }
                placeholder="Description"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="location"
                type="text"
                onChange={(e) => setJob({ ...job, location: e.target.value })}
                placeholder="vadodara"
              />
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="salary"
              >
                Salary
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="salary"
                type="text"
                onChange={(e) => setJob({ ...job, salary: e.target.value })}
                placeholder="500000"
              />
            </div>
          </div>
          <button
            type="submit"
            className="border-solid border-black border-2 rounded-md px-3 py-1 mt-5"
            onClick={handlePostJob}
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
