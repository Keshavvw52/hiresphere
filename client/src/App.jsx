

import axios from "axios";

import { useAuth } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import React, { useContext, useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Applications from "./pages/Applications";
import ApplyJob from "./pages/ApplyJob";
import RecruiterLogin from "./components/RecruiterLogin";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";
import "quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  console.log("BACKEND:", import.meta.env.VITE_BACKEND_URL);
  const hasSynced = useRef(false);

  const { showRecruiterLogin, companyToken } = useContext(AppContext);
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();

useEffect(() => {
  if (!isLoaded || !isSignedIn || !user || hasSynced.current) return;

  const sendUser = async () => {
    try {
      console.log("EFFECT RUNNING");
      console.log("USER:", user);

      const token = await getToken();
      console.log("TOKEN:", token);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/sync-user`,
        {
          name: user.fullName,
          email: user.primaryEmailAddress?.emailAddress,
          image: user.imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User synced to DB");

      hasSynced.current = true; // ✅ stop future calls
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  sendUser();
}, [isLoaded, isSignedIn]);

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/recruiter-login" element={<RecruiterLogin />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/dashboard" element={<Dashboard />}>
       <>
  <Route path="add-job" element={<AddJob />} />
  <Route path="manage-job" element={<ManageJobs />} />
  <Route path="view-applications" element={<ViewApplications />} />
</>
        </Route>
      </Routes>
    </div>
  );
};

export default App;



