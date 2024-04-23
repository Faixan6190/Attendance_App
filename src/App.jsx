import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Sign Up";
import { Routes, Route } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import AuthRoute from "./routes/AuthRoute";
import AdminProtectedRoute, { StdProtectedRoute } from "./routes/ProtectedRoute";
import StdList from "./pages/StdList";
import StdPortal from "./pages/Portal";
import Settings from "./pages/Settings";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route index element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
        </Route>
        <Route element={<AdminProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stdlist" element={<StdList />} />
          <Route path="/attendance" element={<Attendance />} />
        </Route>
        <Route element={<StdProtectedRoute />}>
          <Route path="/portal" element={<StdPortal />} />
          <Route path="/setting" element={<Settings />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>

  );
}

export default App;
