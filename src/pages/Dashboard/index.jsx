import "./dashboard.css";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { AdminLayout, InputField } from "../../components";
import { Button, Divider, Box, Grid, Container } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { ToastAlert } from "../../utils/toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { uploadFile } from "../../utils/uploadImage";
import { Loader } from "../../utils/LoaderSpinner";

const Dashboard = () => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [fullName, setFullName] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stdimage, setstdimage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // console.log("stdimage", stdimage)

  const handleAddStd = async () => {
    try {
      setIsLoading(true);
      if (!fullName || !course || !email || !password) {
        ToastAlert("required field are missing", "error");
        return;
      }
      const stdData = await createUserWithEmailAndPassword(auth, email, password);
      const userID = stdData.user.uid;
      //Image
      const imageURL = await uploadFile(stdimage);
      const obj = {
        email,
        name: fullName,
        type: "std",
        course,
        imageURL,
        isActive: true,
      };
      await setDoc(doc(db, "users", userID), obj);
      ToastAlert("Std Created!", "success");
    } catch (error) {
      ToastAlert(error.code || error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AdminLayout>
        <h1>Add Students</h1>
        <Divider />
        <Container>
          <Grid container mt={2} columnSpacing={5} rowSpacing={5}>
            <Grid item sm={6}>
              <InputField id="fullName" label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </Grid>
            <Grid item sm={6}>
              <InputField id="course" label="Course" value={course} onChange={(e) => setCourse(e.target.value)} />
            </Grid>
            <Grid item sm={6}>
              <InputField id="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Grid>
            <Grid item sm={6}>
              <InputField
                id="Password"
                value={password}
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item sm={12}>
              <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
                Upload file
                <VisuallyHiddenInput type="file" onChange={(e) => setstdimage(e.target.files[0])} />
              </Button>
            </Grid>
            <Grid item sm={12}>
              {/* <button onClick={handleAddStd} disabled={isLoading} className="button" style={{ verticalAlign: "middle" }}>   {isLoading ? 'Loading...' : ''}<span>Add Student</span></button> */}
              <button onClick={handleAddStd} className="button" style={{ verticalAlign: "middle" }}>
                {isLoading ? (
                  <span>
                    <Loader />
                  </span>
                ) : (
                  <span>Add Student</span>
                )}
              </button>
            </Grid>
          </Grid>
        </Container>
      </AdminLayout>
    </>
  );
};

export default Dashboard;
