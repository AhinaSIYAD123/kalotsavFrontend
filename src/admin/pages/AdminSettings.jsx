import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";

import AdminSidebar from "../components/AdminSidebar";
import Navbar from "../../components/Navbar";
import { getAdminAPI, updateAdminAPI } from "../../services/allAPIs";
import { useThemeContext } from "../../ContextShareAPI/ThemeContext";

export default function AdminSettings() {
  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
    cpassword: "",
    profileFile: null,
    profileURL: null,
  });

  const [refreshSidebar, setRefreshSidebar] = useState(0);

  const { mode } = useThemeContext();
  const isLight = mode === "light";

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const result = await getAdminAPI({});
        if (result.success) {
          setAdminDetails({
            username: result.data.username,
            password: "",
            cpassword: "",
            profileFile: null,
            profileURL: result.data.profile,
          });
        }
      } catch (err) {
        console.error("Failed to fetch admin data", err);
      }
    };
    fetchAdmin();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setAdminDetails({ ...adminDetails, profileFile: files[0] });
    } else {
      setAdminDetails({ ...adminDetails, [name]: value });
    }
  };

  const handleUpdate = async () => {
    if (adminDetails.password !== adminDetails.cpassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("username", adminDetails.username);

    if (adminDetails.password)
      formData.append("password", adminDetails.password);

    if (adminDetails.profileFile)
      formData.append("profile", adminDetails.profileFile);

    try {
      const result = await updateAdminAPI(formData);

      if (result.data.success) {
        alert("Admin updated successfully!");

       const { username, profile } = result.data;

setAdminDetails({
  username,
  password: "",
  cpassword: "",
  profileFile: null,
  profileURL: profile || adminDetails.profileURL,
});


        setRefreshSidebar((prev) => prev + 1);
      } else {
        alert(result?.data?.error || "Update failed!");
      }
    } catch (err) {
      console.error("Update API error:", err);
      alert("Something went wrong!");
    }
  };

  const profileSrc = adminDetails.profileFile
    ? URL.createObjectURL(adminDetails.profileFile)
    : adminDetails.profileURL
    ? `http://localhost:5000/uploads/${adminDetails.profileURL}`
    : "/admin-profile.png";

  return (
    <Box
      sx={{
        backgroundColor: isLight ? "white" : "#121212",
        minHeight: "100vh",
        color: isLight ? "black" : "white",
      }}
    >
      <Navbar />

      <Box sx={{ display: "flex" }}>
        <AdminSidebar refresh={refreshSidebar} />

        <Box sx={{ ml: "240px", flexGrow: 1, p: 4 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 700,
              color: isLight ? "black" : "white",
            }}
          >
            Admin Settings
          </Typography>

          <Card
            sx={{
  maxWidth: 600,
  p: 3,
  borderRadius: 3,
  backgroundColor: isLight ? "white" : "#1f1f1f",
  color: isLight ? "black" : "white",
  border: isLight ? "1px solid #d4a373" : "1px solid #ff7e40", 
}}

          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Box
                  component="img"
                  src={profileSrc}
                  alt="Profile"
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    objectFit: "cover",
                    mb: 1,
                  }}
                />
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    mb: 2,
                    backgroundColor: isLight ?"#d4a373" : "white",
                    "&:hover": {
                      backgroundColor: isLight ? "#333" : "white",
                    },color:"black",
                  }}
                >
                  Change Profile
                  <input type="file" hidden name="profile" onChange={handleChange} />
                </Button>
              </Box>

              <TextField
                fullWidth
                label="Username"
                name="username"
                value={adminDetails.username}
                onChange={handleChange}
                sx={{
                  mb: 2,
                  input: { color: isLight ? "black" : "white" },
                  label: { color: isLight ? "black" : "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: isLight ? "black" : "black",
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                value={adminDetails.password}
                onChange={handleChange}
                sx={{
                  mb: 2,
                  input: { color: isLight ? "black" : "white" },
                  label: { color: isLight ? "black" : "white" },
                }}
              />

              <TextField
                fullWidth
                type="password"
                label="Confirm Password"
                name="cpassword"
                value={adminDetails.cpassword}
                onChange={handleChange}
                sx={{
                  mb: 3,
                  input: { color: isLight ? "black" : "white" },
                  label: { color: isLight ? "black" : "white" },
                }}
              />

              <Button
                fullWidth
                variant="contained"
                onClick={handleUpdate}
                sx={{
                  backgroundColor: isLight ? "#d4a373" : "white",
                  color: "black",
                  "&:hover": {
                    backgroundColor: isLight ? "#c49a6c" : "#e56d36",
                  },
                }}
              >
                Update Settings
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
