import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from "axios";
import Loader from "../components/Loader";

function ApplyJob() {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    axios
      .post(`http://localhost:3000/api/job/apply`, { id })
      .then((res) => {
        setJob(res.data);
        setTimeout(() => {
          setLoading(false);
        }, 300);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleGetJobDetails = () => {
    // Apply job logic
    if (!resume) return alert("Please upload resume");

    const formData = new FormData();
    formData.append("id", id);
    formData.append("resume", resume);

    try {
      axios
        .post(`http://localhost:3000/api/job/applyjob`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <Loader />
      </>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-96 mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>{job.description}</li>
            <li>Location: {job.location}</li>
            <li>Salary: {job.salary}</li>
          </ul>
          <div className="mb-4">
            <span className="font-bold">Employer:</span>{" "}
            {job.employer?.username}
          </div>
          <div className="flex">
            <button
              className="bg-blue-600 hover:bg-blue-700 mr-2 text-white font-semibold px-4 rounded-lg"
              onClick={handleGetJobDetails}
            >
              Apply
            </button>

            <input
              type="file"
              class="block w-full text-sm cursor-pointer    text-gray-500
        file:me-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-600 file:text-white
        hover:file:bg-blue-700
        file:disabled:opacity-50     
      "
              accept="application/pdf"
              name="resume"
              onChange={handleResumeUpload}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyJob;
