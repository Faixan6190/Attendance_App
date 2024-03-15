import { Delete, Send } from "@mui/icons-material";
import "./App.css";
import { Button } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <h1>Hello World</h1>
      <Button variant="contained" color="error" sx={{
        marginRight: "5px",
      }}>
        Sign Up
      </Button>
      <Button variant="outlined" endIcon={<Delete />}>
        Delete
      </Button>
      <Button variant="text" endIcon={<Send />}>
        Send
      </Button>
    </>
  );
}

export default App;
