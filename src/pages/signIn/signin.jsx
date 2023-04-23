import React from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Divider, Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import api from "../../utils/api";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  SHOW_ERROR_NOTIFICATION,
  SHOW_SUCCESS_NOTIFICATION,
} from "../../utils/toastify";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  outline: "none",
  pt: 2,
  px: 4,
  pb: 3,
};

const responsiveStyle = {
  width: "90%",
  maxWidth: 600,
};

const customStyle = {
  input: {
    background: "#f2f5fa",
    border: "1px solid #f2f5fa",
    borderRadius: "13px",
    boxSizing: "border-box",
    color: " var(--text-color2)",
    display: "flex",
    fontSize: "15px",
    fontWeight: " 550",
    height: " 45px",
    lineHeight: 1.5,
    margin: "5px auto",
    padding: "0 10px",
    width: "100%",
  },
  submitButton: {
    alignItems: "center",
    background: "#f3912e",
    border: "none",
    borderRadius: "12px",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    height: "45px",
    justifyContent: "center",
    margin: " 5px 0",
    opacity: 1,
    width: "80%",
  },
};

const SignIn = ({
  open,
  handleClosesSignModal,
  handleOpenSignModal,
  toggle,
  setAuth,
  setStatus
}) => {
  const initialValues = {
    email: "",
    password: "",
  };

  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await api.post("/users/signin", values);
      if (response.data.status) {
        SHOW_SUCCESS_NOTIFICATION(response.data.message);
        handleClosesSignModal();
        // setAuth(response.data.status)
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("userId", response.data.userId)
        setAuth("true")
        setStatus("true")
      }
    } catch (error) {
      if (error.response) {
        SHOW_ERROR_NOTIFICATION(error.response.data.message);
        localStorage.setItem("isLogin", "false");
        setAuth("false")
        setStatus("false")
      }
    }

    setTimeout(() => {
      setSubmitting(false);
    }, 400);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClosesSignModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, ...responsiveStyle }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Sign in
            </Typography>
            <CloseIcon onClick={handleClosesSignModal} />
          </Box>

          <Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img
                  width={"30px"}
                  src="https://www.cipherschools.com/static/media/Cipherschools_icon@2x.3b571d743ffedc84d039.png"
                />
                <Typography variant="h4">Cipher</Typography>
              </Box>
              <Box>
                <Typography variant="h5">Hey, Welcome!</Typography>
                <Typography variant="h5">
                  Please provide your email and password to signin
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div>
                    <Field
                      name="email"
                      type="email"
                      style={customStyle.input}
                      placeholder="Email"
                    />
                    <ErrorMessage name="email" />
                  </div>
                  <div style={{position:"relative"}}>
                    <Field
                      name="password"
                      type={showPassword ?  "text" : "password"}
                      style={customStyle.input}
                      placeholder="Password"
                    />
                    <ErrorMessage name="password" />
                    <span style={{position:"absolute" , top:"20%" ,right:"30px"}} onClick={handleShowPassword}>
                      {
                        showPassword ?<VisibilityIcon/> :<VisibilityOffIcon  />
                      }
                      
                    </span>
                  </div>

                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      style={customStyle.submitButton}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Sign in
                    </button>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <Typography>
                      Don't have an account ?{" "}
                      <span style={{ color: "#f3912e" }} onClick={toggle}>
                        Get Started
                      </span>
                    </Typography>
                  </Box>
                </Form>
              )}
            </Formik>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default SignIn;
