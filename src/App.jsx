import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Sign Up";
import { Routes, Route } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import Example from "./Example";



// import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Navbar /> */}
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
