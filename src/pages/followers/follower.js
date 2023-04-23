import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";

const Follower = () => {
    const follwer = [{
        name : "Rahul",
        occupation:"Collage Student",
        follower: "10 follower",
    },
    {
        name : "Santosh",
        occupation:"Collage Student",
        follower: "10 follower",
    },
    {
        name : "Ravi",
        occupation:"Collage Student",
        follower: "10 follower",
    },
    {
        name : "Sangita",
        occupation:"Collage Student",
        follower: "10 follower",
    },
    {
        name : "Neha",
        occupation:"Collage Student",
        follower: "10 follower",
    },
    {
        name : "Santosh",
        occupation:"Collage Student",
        follower: "10 follower",
    },
    {
        name : "Rupali",
        occupation:"Collage Student",
        follower: "10 follower",
    },
    {
        name : "Naresh",
        occupation:"Collage Student",
        follower: "10 follower",
    },
    {
        name : "Suresh",
        occupation:"Collage Student",
        follower: "10 follower",
    },
    {
        name : "Devender",
        occupation:"Collage Student",
        follower: "10 follower",
    }, {
        name : "Ram",
        occupation:"Collage Student",
        follower: "10 follower",
    },
    {
        name : "Sonu",
        occupation:"Collage Student",
        follower: "10 follower",
    }


]
  return (
    <>
      <Box>
        <Typography>User Following You</Typography>
      </Box>

      <Grid container spacing={2}>
        {
            follwer.map((item)=>{
                return(
                    <Grid item xs={6} sm={3} md={2}>
                    <Card>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100px",
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: deepOrange[500],
                            width: "80px",
                            height: "80px",
                            textAlign:"center"
                          }}
                          alt={item.name}
                          src="/broken-image.jpg"
                        ></Avatar>
                      </Box>
                      <CardContent>
                        <Typography sx={{fontSize:"13px"}}>{item.name}</Typography>
                        <Typography sx={{fontSize:"13px"}}>{item.occupation}</Typography>
                        <Typography sx={{fontSize:"13px"}}>{item.follower}</Typography>
                      </CardContent>
                      <Box sx={{display:"flex", justifyContent:"center", padding:"10px" }}>
                          <Button variant="contained" sx={{width:"100%" , backgroundColor:"#f3912e"}}>Follow</Button>
                      </Box>
                    </Card>
                  </Grid>
                )
            })
        }
       
      </Grid>
    </>
  );
};

export default Follower;
