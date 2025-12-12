

import React, { useState, useEffect } from "react";
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

import OSidebar from "../components/OSidebar";
import Navbar from "../../components/Navbar";
import { getOrganizerAPI, updateOrganizerAPI } from "../../services/allAPIs";
import { useThemeContext } from "../../ContextShareAPI/ThemeContext";

function OrganizerProfile() {
  const { mode } = useThemeContext();
  const isLight = mode === "light";

  const [organizerData, setOrganizerData] = useState({
    email: "",
    password: "",
    cpassword: "",
    profile: null
  });

  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState({ text: "", success: true });

  
  useEffect(() => {
    const fetchOrganizer = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const header = { Authorization: `Bearer ${token}` };
        const res = await getOrganizerAPI(header);

        if (res?.data?.success) {
          setOrganizerData((prev) => ({
            ...prev,
            email: res.data.data.email
          }));
          setPreview(res.data.data.profile ? `/uploads/${res.data.data.profile}` : "");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setMessage({ text: "Failed to fetch organizer data", success: false });
      }
    };

    fetchOrganizer();
  }, []);

  const uploadFile = (e) => {
    const file = e.target.files[0];
    setOrganizerData({ ...organizerData, profile: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleReset = () => {
    setOrganizerData((prev) => ({
      ...prev,
      password: "",
      cpassword: "",
      profile: null
    }));
    setPreview("");
    setMessage({ text: "", success: true });
  };

  const handleUpdate = async () => {
    if (organizerData.password && organizerData.password !== organizerData.cpassword) {
      alert("Passwords do not match");
      return;
    }

    const token = sessionStorage.getItem("token");
    const header = { Authorization: `Bearer ${token}` };

    const formData = new FormData();
    if (organizerData.password) formData.append("password", organizerData.password);
    if (organizerData.profile) formData.append("profile", organizerData.profile);

    try {
      const res = await updateOrganizerAPI(formData, header);

      if (res?.data?.success) {
        setMessage({ text: "Profile updated successfully!", success: true });
        setOrganizerData((prev) => ({ ...prev, password: "", cpassword: "" }));

        if (res.data.data.profile) {
          setPreview(`/uploads/${res.data.data.profile}`);
        }
      } else {
        setMessage({ text: res?.data?.message || "Update failed!", success: false });
      }
    } catch (err) {
      console.error("Update error:", err);
      setMessage({ text: "Update failed!", success: false });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: isLight ? "white" : "#121212",
        color: isLight ? "black" : "white",
        transition: "0.3s ease"
      }}
    >
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <OSidebar />

        <Box sx={{ flex: 1, p: 4, ml: "240px" }}>
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 700,
              color: isLight ? "black" : "white",
              transition: "0.3s ease"
            }}
          >
            Organizer Settings
          </Typography>

          <Grid container spacing={4}>
          
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: isLight ? "#333" : "#ffdd9b",
                  lineHeight: 1.8,
                  transition: "0.3s ease"
                }}
              >
                Update your profile details here.  
                You can update your password, change your picture,  
                or reset changes anytime.
              </Typography>
            </Grid>

          
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  p: 4,
                  borderRadius: 3,
                  backgroundColor: isLight ? "white" : "#1e1e1e",
                  border: `2px solid ${isLight ? "black" : "#ffdd9b"}`,
                  transition: "0.3s ease"
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                
                  <label htmlFor="uploadPic">
                    <input type="file" id="uploadPic" hidden onChange={uploadFile} />
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
                        border: `2px solid ${isLight ? "black" : "#ffdd9b"}`,
                        cursor: "pointer",
                        transition: "0.3s ease"
                      }}
                    />
                  </label>

                 
                  <TextField
                    fullWidth
                    label="Email"
                    value={organizerData.email}
                    disabled
                    sx={{
                      mb: 2,
                      input: { color: isLight ? "black" : "white" },
                      label: { color: isLight ? "black" : "#ffdd9b" },
                      "& fieldset": { borderColor: isLight ? "black" : "#ffdd9b" }
                    }}
                  />

                 
                  <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    value={organizerData.password}
                    onChange={(e) =>
                      setOrganizerData({ ...organizerData, password: e.target.value })
                    }
                    sx={{
                      mb: 2,
                      input: { color: isLight ? "black" : "white" },
                      label: { color: isLight ? "black" : "#ffdd9b" },
                      "& fieldset": { borderColor: isLight ? "black" : "#ffdd9b" }
                    }}
                  />

                
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    value={organizerData.cpassword}
                    onChange={(e) =>
                      setOrganizerData({ ...organizerData, cpassword: e.target.value })
                    }
                    sx={{
                      mb: 4,
                      input: { color: isLight ? "black" : "white" },
                      label: { color: isLight ? "black" : "#ffdd9b" },
                      "& fieldset": { borderColor: isLight ? "black" : "#ffdd9b" }
                    }}
                  />

                  
                  <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleReset}
                      sx={{
                        backgroundColor: isLight ? "#666" : "#333",
                        "&:hover": { backgroundColor: isLight ? "#444" : "#555" }
                      }}
                    >
                      Reset
                    </Button>

                    <Button
                      variant="contained"
                      onClick={handleUpdate}
                      sx={{
                        backgroundColor: isLight ? "black" : "#ffdd9b",
                        color: isLight ? "white" : "black",
                        "&:hover": {
                          backgroundColor: isLight ? "#222" : "#f2c87b"
                        }
                      }}
                    >
                      Update
                    </Button>
                  </Box>

                  {message.text && (
                    <Typography
                      sx={{
                        mt: 2,
                        color: message.success ? "green" : "red",
                        transition: "0.3s ease"
                      }}
                    >
                      {message.text}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default OrganizerProfile;
