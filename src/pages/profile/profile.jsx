import React from "react";
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
};

const customStyle = {
  input: {
    background: "#fff",
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

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
};

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

const Profile = () => {
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
            <Box>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 56, height: 56 }}
              />
            </Box>

            <Box>
              <Typography>Hello ,</Typography>
              <Typography fontWeight={550}>Santosh Pandit</Typography>
              <Typography>panditsantosh1997@gmail.com</Typography>
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
          <Button variant="contained" >Edit</Button>
        </Box>
        <TextareaAutosize
          maxRows={10}
          aria-label="maximum height"
          placeholder="Write something about you"
          defaultValue=""
          style={styles.textArea}
        />
        &nbsp;
        <Divider />
        &nbsp;
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Cipher Map</Typography>
          <Button variant="contained" >Edit</Button>
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
                    <Button variant="contained" >Edit</Button>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <div>
                        <label htmlFor="Linkedin">Linkedin</label>
                        <Field
                          name="Linkedin"
                          type="text"
                          style={customStyle.input}
                          placeholder="Linkedin"
                        />
                        <ErrorMessage name="Linkedin" />
                      </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <div>
                        <label htmlFor="Github">Github</label>
                        <Field
                          name="Github"
                          type="text"
                          style={customStyle.input}
                          placeholder="Github"
                        />
                        <ErrorMessage name="Github" />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div>
                        <label htmlFor="Facebook">Facebook</label>
                        <Field
                          name="Facebook"
                          type="Facebook"
                          style={customStyle.input}
                          placeholder="Facebook"
                        />
                        <ErrorMessage name="Facebook" />
                      </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <div>
                        <label htmlFor="Twitter">Twitter</label>
                        <Field
                          name="Twitter"
                          type="text"
                          style={customStyle.input}
                          placeholder="Twitter"
                        />
                        <ErrorMessage name="Twitter" />
                      </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <div>
                        <label htmlFor="Instagram">Instagram</label>
                        <Field
                          name="Instagram"
                          type="text"
                          style={customStyle.input}
                          placeholder="Instagram"
                        />
                        <ErrorMessage name="Instagram" />
                      </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <div>
                        <label htmlFor="Website">Website</label>
                        <Field
                          name="Website"
                          type="text"
                          style={customStyle.input}
                          placeholder="Website"
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
                    <Button variant="contained">Edit</Button>
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
                          value={""}
                          label="Age"
                          onChange={""}
                          style={customStyle.input}
                        >
                          <MenuItem value={10}>Secondary</MenuItem>
                          <MenuItem value={20}>Higher Education</MenuItem>
                          <MenuItem value={30}>Graduation</MenuItem>
                          <MenuItem value={30}>Post Graduation</MenuItem>
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
                          value={""}
                          label="Highest education"
                          onChange={""}
                          style={customStyle.input}
                        >
                          <MenuItem value={10}>Schooling </MenuItem>
                          <MenuItem value={20}>Collage Student</MenuItem>
                          <MenuItem value={30}>Teaching</MenuItem>
                          <MenuItem value={30}>Job</MenuItem>
                          <MenuItem value={30}>Freelancing</MenuItem>
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
                    <Button variant="contained" >Edit</Button>
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
                    <Button variant="contained" >Edit</Button>
                  </Box>

                </Form>
              )}
            </Formik>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
