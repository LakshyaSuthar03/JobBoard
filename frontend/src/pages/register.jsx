import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("employee");
  const notify = (toastMsg) => toast(toastMsg);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const data = {
      username: username,
      email: email,
      password: password,
      userType: userType,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        data
      );

      if (response.status === 200) {
        notify(response.data.message);
        navigate("/api/auth/login");
      } else {
        notify(response.data.message);
      }
    } catch (error) {
      notify(error.response.data.message);
    }
  };

  return (
    <div className="h-dvh flex justify-center items-center">
      <ToastContainer />
      <div className="border-solid border-2 rounded-md border-black h-auto w-64 p-5">
        <p className="font-semibold text-2xl">Register</p>
        <div className="inner h-full flex flex-col items-center justify-center">
          <div className="inputContainer py-5">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="border-solid border-2 border-slate-200 rounded-md w-full"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="border-solid border-2 border-slate-200 rounded-md w-full"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="border-solid border-2 border-slate-200 rounded-md w-full"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <select name="userType" id="userType" onChange={(e)=>{setUserType(e.target.value)}}>
              <option value="employee">Employee</option>
              <option value="employer">Employer</option>
            </select>
          </div>
          <button
            className="bg-black text-white py-1 px-4 rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <p className="text-sm p-2">
            Already have an account?{" "}
            <Link to={"/api/auth/login"}>
              <span className="underline underline-offset-2">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
