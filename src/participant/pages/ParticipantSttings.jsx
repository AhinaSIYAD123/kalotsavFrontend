import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Typography
} from "@mui/material";

import PSidebar from "../components/PSidebar";
import Navbar from "../../components/Navbar";
import { useThemeContext } from "../../ContextShareAPI/ThemeContext"; 

function ParticipantSettings() {
  const { mode } = useThemeContext(); 
  const [preview, setPreview] = useState("");

  const [participantData, setParticipantData] = useState({
    name: "Ahina",
    password: "",
    cpassword: "",
    profile: ""
  });

  const bgColor = mode === "light" ? "white" : "#121212";
  const textColor = mode === "light" ? "#000" : "#fff";
  const cardBg = mode === "light" ? "#fff" : "#1e1e1e";
  const borderColor = mode === "light" ? "#000" : "#aaa";

  const uploadFile = (e) => {
    const file = e.target.files[0];
    setParticipantData({ ...participantData, profile: file });

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleReset = () => {
    setParticipantData({
      name: "Ahina",
      password: "",
      cpassword: "",
      profile: ""
    });
    setPreview("");
  };

  const handleUpdate = () => {
    alert("Profile updated!");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: bgColor, color: textColor }}>
      <Navbar />

      <Box sx={{ display: "flex" }}>
        <PSidebar />

        <Box sx={{ flex: 1, p: 4, ml: "240px" }}>
          <Typography
            variant="h4"
            sx={{ mb: 4, fontWeight: 700, color: textColor }}
          >
            Settings
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ color: textColor, lineHeight: 1.8 }}>
                Update your profile details here. You can edit your name,
                update your profile picture, or reset changes anytime.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  p: 4,
                  borderRadius: 3,
                  backgroundColor: cardBg,   
                  border: `2px solid ${borderColor}`
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>

                 
                  <label htmlFor="uploadPic">
                    <input
                      type="file"
                      id="uploadPic"
                      hidden
                      onChange={uploadFile}
                    />
                    <Avatar
                      src={
                        preview ||
                        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      }
                      sx={{
                        width: 100,
                        height: 100,
                        margin: "0 auto",
                        mb: 3,
                        border: `2px solid ${borderColor}`, 
                        cursor: "pointer",
                      }}
                    />
                  </label>

                 
                  <TextField
                    fullWidth
                    label="Your Name"
                    value={participantData.name}
                    onChange={(e) =>
                      setParticipantData({
                        ...participantData,
                        name: e.target.value
                      })
                    }
                    sx={{ mb: 2 }}
                  />

                  
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={participantData.password}
                    onChange={(e) =>
                      setParticipantData({
                        ...participantData,
                        password: e.target.value
                      })
                    }
                    sx={{ mb: 2 }}
                  />

                  
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    value={participantData.cpassword}
                    onChange={(e) =>
                      setParticipantData({
                        ...participantData,
                        cpassword: e.target.value
                      })
                    }
                    sx={{ mb: 4 }}
                  />

                 
                  <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleReset}
                      sx={{
                        backgroundColor: mode === "light" ? "#666" : "#888",
                        "&:hover": {
                          backgroundColor: mode === "light" ? "#444" : "#666"
                        }
                      }}
                    >
                      Reset
                    </Button>

                    <Button
                      variant="contained"
                      onClick={handleUpdate}
                      sx={{
                        backgroundColor: mode === "light" ? "#000" : "#fff",
                        color: mode === "light" ? "#fff" : "#000",
                        "&:hover": {
                          backgroundColor: mode === "light" ? "#222" : "#ddd"
                        }
                      }}
                    >
                      Update
                    </Button>
                  </Box>

                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default ParticipantSettings;
