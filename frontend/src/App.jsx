import React from "react";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/Home";
import PrivateRoutes from "./utils/ProtectedRoutes";
import AuthProtectedRoutes from "./utils/AuthProtectedRoutes";
import ApplyJob from "./pages/ApplyJob";
import PostJob from "./pages/PostJob";
import ViewApplicants from "./pages/ViewApplicants";
import Applied from "./pages/Applied"
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/job/:id" element={<ApplyJob />} />
          <Route path="/postjob" element={<PostJob />} />
          <Route path="/job/applicants/:id" element={<ViewApplicants />} />
          <Route path="/applied" element={<Applied />} />
        </Route>
        <Route element={<AuthProtectedRoutes />}>
          <Route path="/api/auth/login" element={<Login />} />
          <Route path="/api/auth/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
