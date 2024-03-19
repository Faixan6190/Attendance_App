import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Sign Up";
import { Routes, Route } from "react-router-dom"
// import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="testing" element={<Signup />} />
        {/* <Navbar /> */}
      </Routes>
    </>
  );
}

export default App;
