import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  login as loginAction,
  logout as logoutAction,
} from "../features/auth/authSlice";
axios.defaults.withCredentials = true;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const notify = (toastMsg) => toast(toastMsg);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async () => {
    const data = {
      username,
      password,
    };
    if (isAuthenticated) {
      navigate("/");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        data,
        { withCredentials: true }
      );
      if (response.status === 200) {
        notify(response.data.message);
        dispatch(loginAction(response.data));
      } else {
        notify(response.data.message);
      }
    } catch (error) {
      notify(error.message);
    }
  };

  return (
    <div className="h-dvh flex justify-center items-center">
      <ToastContainer />
      <div className="border-solid border-2 rounded-md border-black h-auto w-64 p-5">
        <p className="font-semibold text-2xl">Login</p>
        <div className="inner h-full flex flex-col items-center justify-center">
          <div className="inputContainer py-5">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="border-solid border-2 border-slate-200 rounded-md w-full"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="border-solid border-2 border-slate-200 rounded-md w-full"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-black text-white py-1 px-4 rounded-md"
          >
            Submit
          </button>
          <p className="text-sm p-2">
            Don't have an account?
            <Link to={"/api/auth/register"}>
              <span className="underline underline-offset-2"> Register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
