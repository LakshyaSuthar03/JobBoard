import React from "react";
import NavBar from "../components/NavBar";
import JobContainer from "../components/JobContainer";
import PostedJobs from "../pages/PostedJobs";
import { useSelector } from "react-redux"; 
     
const Home = () => {
  const userType = useSelector(state => state.auth.userType);
  
  return (
    <div>
      <NavBar />
      {userType === "employee"?  <JobContainer />:<PostedJobs/>}
    
    </div>
  );
};

export default Home;
