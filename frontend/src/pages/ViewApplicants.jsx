import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewApplicants() {
  const [applicants, setApplicants] = useState([]);
  const { id } = useParams();

  const handleViewResume = (resumePath) => {
    try {
      axios
        .post("http://localhost:3000/api/job/resume", { resumePath }, { responseType: "blob" })
        .then((res) => {
          const file = new Blob([res.data], { type: "application/pdf" });
          const fileUrl = URL.createObjectURL(file);
          window.open(fileUrl);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleResponse = (e, id, response) => {
    const confirmResponse = confirm(`Are you sure you want to ${response} this applicant? (ok = yes/cancel = no)`);
    if (!confirmResponse) return;

    axios
      .post("http://localhost:3000/api/job/response", { response, id })
      .then((res) => {
        if (res.status === 200) {
          alert("Response sent successfully");
          setApplicants(applicants.map(applicant => 
            applicant._id === id ? { ...applicant, status: response } : applicant
          ));
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/job/applicants/", { id })
      .then((res) => setApplicants(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (applicants.length === 0) {
    return (
      <>
        <NavBar />
        <div className="w-full h-dvh flex justify-center items-center">No Applicants</div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="w-full h-dvh flex justify-center items-center">
        <div className="w-2/3 h-2/3">
          {applicants.map((applicant) => (
            <div className="w-full py-1 px-2 border-solid border-black border-2 rounded-md mb-3" key={applicant._id}>
              <span>Name: {applicant.employee.username}</span>
              <button
                className="float-end bg-red-500 rounded-lg px-1"
                id="rejected"
                onClick={(e) => handleResponse(e, applicant.job, "rejected")}
              >
                Reject
              </button>
              <button
                className="float-end mx-3 bg-green-500 rounded-lg px-1"
                id="selected"
                onClick={(e) => handleResponse(e, applicant.job, "accepted")}
              >
                Select
              </button>
              <button className="float-end" onClick={() => handleViewResume(applicant.resume)}>
                View Resume
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewApplicants;
