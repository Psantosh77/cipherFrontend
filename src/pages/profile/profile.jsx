import React, { useState } from "react";
import Register from "../registration/registration";
import Box from "@mui/material/Box/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography/Typography";
import Grid from "@mui/material/Grid/Grid";
import Button from "@mui/material/Button/Button";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Divider, InputLabel, MenuItem, Select } from "@mui/material";
import api from "../../utils/api";
import { useEffect } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

import {
  SHOW_ERROR_NOTIFICATION,
  SHOW_SUCCESS_NOTIFICATION,
} from "../../utils/toastify";
import { deepOrange } from "@mui/material/colors";
import Follower from "../followers/follower";

const styles = {
  textArea: {
    background: "white",
    outline: "none",
    borderRadius: "5px",
    display: "flex",
    fontSize: "14px",
    fontWeight: "550",
    lineHeight: 1.5,
    overflow: "hidden auto",
    resize: "none",
    width: "100%",
    height: "100px",
    marginTop: "10px",
  },

  Modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    bgcolor: "background.paper",
    borderRadius: "20px",
    boxShadow: 24,
    outline: "none",
    pt: 2,
    px: 4,
    pb: 3,

    width: "90%",
    maxWidth: 600,
  },
};

const customStyle = {
  input: {
    background: "#ffffff",
    border: "none",
    outline: "none",
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
  demographyInput:{
    background: "#f2f5fa",
    border: "none",
    outline: "none",
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



const Profile = () => {
  const UserId = localStorage.getItem("userId");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",

    aboutme: "",

    facebook: "",
    github: "",
    instagram: "",
    linkedin: "",
    website: "",
  };

  const [userData, setUserData] = React.useState(initialValues);
  const [higherEductions, setHigherEducation] = React.useState(null)
  const [correntlyDo, setCorrentlyDo] = React.useState(null)

  const [demography, setDemography] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters"),
    phoneNumber: Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(8),
  });

  const getUser = async () => {
    try {
      const response = await api.get(`/users/getUser/${UserId}`);
      
      const data = response.data.message;
      const status = response.data.status;
      if (status) {
        setUserData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,

          aboutme: data.aboutme,
          facebook: data.facebook,
          github: data.github,
          instagram: data.instagram,
          linkedin: data.linkedin,
          twitter: data.twitter,
          website: data.website,
        });

        setDemography({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
        });

        setHigherEducation(data.higherEducation)
        setCorrentlyDo(data.correntlyDo)
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmitAboutme = async (e) => {
    e.preventDefault();
    const req = {
      id: UserId,
      aboutme: userData.aboutme,
    };
    const response = await api.put("/users/updateUser", req);
    if (response.data.status) {
      SHOW_SUCCESS_NOTIFICATION(response.data.message);
      getUser();
    } else {
      SHOW_ERROR_NOTIFICATION(response.data.message);
    }
  };

  const handleSubmitONWEB = async (e) => {
    e.preventDefault();

    const req = {
      id: UserId,
      facebook: userData.facebook,
      github: userData.github,
      instagram: userData.instagram,
      linkedin: userData.linkedin,
      twitter: userData.twitter,
      website: userData.website,
    };

    const response = await api.put("/users/updateUser", req);

    if (response.data.status) {
      SHOW_SUCCESS_NOTIFICATION(response.data.message);
      getUser();
    } else {
      SHOW_ERROR_NOTIFICATION(response.data.message);
    }
  };

  const handleChangeDemography = (e) => {
    setDemography({ ...demography, [e.target.name]: e.target.value });
  };

  const submitDemography = async (e) => {
    e.preventDefault();
    const req = {
      id: UserId,
      firstName: demography.firstName,
      lastName: demography.lastName,
      email: demography.email,
      phoneNumber: demography.phoneNumber,
    };
    const response = await api.put("/users/updateUser", req);
    if (response.data.status) {
      SHOW_SUCCESS_NOTIFICATION(response.data.message);
      getUser();
      handleClose();
    } else {
      SHOW_ERROR_NOTIFICATION(response.data.message);
    }
  };

  const handleChnageHigherEducation =(e)=>{
    setHigherEducation(e.target.value)
  }

  const handleCurrentlyDo =(e)=>{
    setCorrentlyDo(e.target.value)
  }

  const SubmitProfessional = async (e)=>{
    e.preventDefault();
    try{
      e.preventDefault();
      const req = {
        id: UserId,
        correntlyDo:correntlyDo,
        higherEductions:higherEductions,
      };
      const response = await api.put("/users/updateUser", req);
      if (response.data.status) {
        SHOW_SUCCESS_NOTIFICATION(response.data.message);
        getUser();
      } else {
        SHOW_ERROR_NOTIFICATION(response.data.message);
      }

    }
    catch(err){
      console.log(err)
    }



  }

  
  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2%",
          background: "rgb(158,130,101)",
          backgroundImage:
            "radial-gradient(circle, rgba(158,130,101,1) 30%, rgba(255,255,255,1) 100%)",
        }}
      >
        <Grid sm={12}>
          <Box style={{ display: "flex", gap: "2%", alignItems: "center" }}>
            <Box onClick={handleOpen}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 56, height: 56 }}
              />
            </Box>

            <Box>
              <Typography>Hello ,</Typography>
              <Typography fontWeight={550}>
                {userData.firstName} {userData.lastName}
              </Typography>
              <Typography>{userData.email}</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item sm={0}>
          <Box>0 follower</Box>
        </Grid>
      </Box>

      <Box style={{ padding: "2%", background: "#f2f5fa" }}>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>ABOUT ME</Typography>
          <Button variant="contained" onClick={handleSubmitAboutme} style={{ backgroundColor: "#f3912e", color: "white" }}>
            Save
          </Button>
        </Box>
        <TextareaAutosize
          maxRows={10}
          aria-label="maximum height"
          placeholder="Write something about you"
          defaultValue={userData.aboutme}
          name="aboutme"
          style={styles.textArea}
          onChange={handleChange}
        />
        &nbsp;
        <Divider />
        &nbsp;
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Cipher Map</Typography>
          <Button variant="contained" style={{ backgroundColor: "#f3912e", color: "white" }}>Save</Button>
        </Box>
        &nbsp;
        <Divider />
        &nbsp; &nbsp;
        <Box>
          <Grid>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Box
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>ON THE WEB</Typography>
                    <Button variant="contained" onClick={handleSubmitONWEB} style={{ backgroundColor: "#f3912e", color: "white" }}>
                      Save
                    </Button>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <div>
                        <label htmlFor="Linkedin">Linkedin</label>
                        <Field
                          name="linkedin"
                          type="text"
                          style={customStyle.input}
                          placeholder="Linkedin"
                          value={userData.linkedin}
                          onChange={handleChange}
                        />
                        <ErrorMessage name="Linkedin" />
                      </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <div>
                        <label htmlFor="Github">Github</label>
                        <Field
                          name="github"
                          type="text"
                          style={customStyle.input}
                          placeholder="Github"
                          value={userData.github}
                          onChange={handleChange}
                        />
                        <ErrorMessage name="Github" />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div>
                        <label htmlFor="Facebook">Facebook</label>
                        <Field
                          name="facebook"
                          type="Facebook"
                          style={customStyle.input}
                          placeholder="Facebook"
                          value={userData.facebook}
                          onChange={handleChange}
                        />
                        <ErrorMessage name="Facebook" />
                      </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <div>
                        <label htmlFor="Twitter">Twitter</label>
                        <Field
                          name="twitter"
                          type="text"
                          style={customStyle.input}
                          placeholder="Twitter"
                          value={userData.twitter}
                          onChange={handleChange}
                        />
                        <ErrorMessage name="Twitter" />
                      </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <div>
                        <label htmlFor="Instagram">Instagram</label>
                        <Field
                          name="instagram"
                          type="text"
                          style={customStyle.input}
                          placeholder="Instagram"
                          value={userData.instagram}
                          onChange={handleChange}
                        />
                        <ErrorMessage name="Instagram" />
                      </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <div>
                        <label htmlFor="Website">Website</label>
                        <Field
                          name="website"
                          type="text"
                          style={customStyle.input}
                          placeholder="Website"
                          value={userData.website}
                          onChange={handleChange}
                        />
                        <ErrorMessage name="Website" />
                      </div>
                    </Grid>
                  </Grid>
                  &nbsp;
                  <Divider />
                  &nbsp;
                  <Box
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>PROFESSIONAL INFORMATION</Typography>
                    <Button onClick={SubmitProfessional} variant="contained" style={{ backgroundColor: "#f3912e", color: "white" }}>Save</Button>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <div>
                        <InputLabel id="demo-simple-select-label">
                          Highest education
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={higherEductions}
                          label="Age"
                          onChange={handleChnageHigherEducation}
                          style={customStyle.input}
                          defaultValue={higherEductions}
                          
                        >
                          <MenuItem value={"Secondary"}>Secondary</MenuItem>
                          <MenuItem value={"Higher Education"}>Higher Education</MenuItem>
                          <MenuItem value={"Graduation"}>Graduation</MenuItem>
                          <MenuItem value={"Post Graduation"}>Post Graduation</MenuItem>
                        </Select>
                        <ErrorMessage name="Highest education" />
                      </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <div>
                        <InputLabel id="demo-simple-select-label">
                          What do you do currently?
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={correntlyDo}
                          label="Highest education"
                          onChange={handleCurrentlyDo}
                          style={customStyle.input}
                        >
                          <MenuItem value={"Schooling"}>Schooling </MenuItem>
                          <MenuItem value={"Collage Student"}>Collage Student</MenuItem>
                          <MenuItem value={"Teaching"}>Teaching</MenuItem>
                          <MenuItem value={"Job"}>Job</MenuItem>
                          <MenuItem value={"Freelancing"}>Freelancing</MenuItem>
                        </Select>
                        <ErrorMessage name="What do you do currently?" />
                      </div>
                    </Grid>
                  </Grid>
                  &nbsp;
                  <Divider />
                  &nbsp;
                  <Box
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>PASSWORD & SECURITY</Typography>
                    <Button variant="contained" style={{ backgroundColor: "#f3912e", color: "white" }}>Save</Button>
                  </Box>
                  <Grid item xs={12} md={6}>
                    <div>
                      <label htmlFor="Password">Password</label>
                      <Field
                        name="Password"
                        type="text"
                        style={customStyle.input}
                        placeholder="Password"
                      />
                      <ErrorMessage name="Password" />
                    </div>
                  </Grid>
                  &nbsp;
                  <Divider />
                  &nbsp;
                  <Box
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>INTERESTS</Typography>
                    <Button variant="contained" style={{ backgroundColor: "#f3912e", color: "white" }}>Save</Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Grid>
        </Box>

        <Box>
        <Follower/>
      </Box>
      </Box>

      {
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styles.Modal}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Profile Update
                </Typography>
                <CloseIcon onClick={handleClose} />
              </Box>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "3%",
                }}
              >
                <Box style={{ flex: 1 }}>
                  <Avatar
                    sx={{
                      bgcolor: deepOrange[500],
                      width: "150px",
                      height: "150px",
                    }}
                    alt="Remy Sharp"
                    src="/broken-image.jpg"
                  ></Avatar>
                </Box>
                <Box style={{ flex: 3 }}>
                  <Grid>
                    <Formik
                      initialValues={demography}
                      validationSchema={validationSchema}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <div>
                            <label htmlFor="firstName">First Name</label>
                            <Field
                              name="firstName"
                              type="text"
                              style={customStyle.demographyInput}
                              placeholder="First Name"
                              value={demography.firstName}
                              onChange={handleChangeDemography}
                            />
                            <ErrorMessage name="firstName" />
                          </div>
                          <div>
                            <label htmlFor="lastName">Last Name</label>
                            <Field
                              name="lastName"
                              type="text"
                              style={customStyle.demographyInput}
                              placeholder="Last Name"
                              onChange={handleChangeDemography}
                              value={demography.lastName}
                            />
                            <ErrorMessage name="Last Name" />
                          </div>
                          <div>
                            <label htmlFor="email">Email</label>
                            <Field
                              name="email"
                              type="email"
                              style={customStyle.demographyInput}
                              placeholder="Email"
                              onChange={handleChangeDemography}
                              value={demography.email}
                            />
                            <ErrorMessage name="email" />
                          </div>
                          <div>
                            <label htmlFor="phoneNumber">Mobile Number</label>
                            <Field
                              name="phoneNumber"
                              type={"number"}
                              style={customStyle.demographyInput}
                              placeholder="Mobile Number"
                              onChange={handleChangeDemography}
                              value={demography.phoneNumber}
                            />
                            <ErrorMessage name="phoneNumber" />
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </Grid>

                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      gap: "2%",
                      marginTop: "2%",
                    }}
                  >
                    <Button onClick={handleClose} variant="contained" style={{ backgroundColor: "#2d3333", color: "white" }}>Cancle</Button>
                    <Button
                      variant="contained"
                      onClick={submitDemography}
                      style={{ backgroundColor: "#f3912e", color: "white" }}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Modal>
        </div>
      }


      
    </>
  );
};

export default Profile;
