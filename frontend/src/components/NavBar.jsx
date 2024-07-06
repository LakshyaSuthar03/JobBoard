import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../features/auth/authSlice";
const navlinks = [

  { name: "Jobs", path: "/",userType:"employee" },
  { name: "Applied", path: "/applied",userType:"employee" },
  { name: "MyJobs", path: "/",userType:"employer" },
  { name: "Job+", path: "/postjob",userType:"employer" },
 
];
const NavBar = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.auth);
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch(logout());
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="w-full h-10 border-2 border-solid border-black fixed top-0 bg-white">
        <div className="flex h-full mx-5">
          <div className="logo mr-auto align-middle my-auto">JOB BOARD</div>
          <div className="navLinks my-auto flex">
            <ul className="flex gap-3">
              {navlinks.map((link,index) => {
                return (
                  userState.userType === link.userType ? <li key={index}>
                  <Link to={link.path}>{link.name}</Link>
                </li> : null
                );
              })}
            </ul>
            <div className="mx-3 bg-black text-white px-1 rounded-md">{userState.username}</div>
            <button className="border-black broder-solid border-2 px-2 rounded-md" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
