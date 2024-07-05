import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
const Applied = () => {
  const [applied, setApplied] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/job/applied")
      .then((res) => setApplied(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <NavBar />
      <div className="w-full h-dvh flex justify-center items-center">
        <div className=" w-2/3 h-2/3">
          {applied.map((job) => {
            return (
              <div
                className="w-full  py-1 px-2 border-solid border-black border-2 rounded-md mb-3 flex justify-between"
                key={job._id}
              >
                <div>Job Title: {job.job.title}</div>
                <div>
                  
                  
                  Statue : {job.status === "accepted" ? "Selected 🟢" : "Rejected 🔴" || job.status === "applied" ? "Pending 🟡":<></>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Applied;
