import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { registerParticipantAPI } from "../services/allAPIs";
import { useThemeContext } from "../ContextShareAPI/ThemeContext";

export default function Register() {
  const location = useLocation();
  const eventName = location.state?.eventName || "Event";
  const navigate = useNavigate();

  const { mode } = useThemeContext();
  const isLight = mode === "light";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    place: "",
    college: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = { eventName, ...formData };

    try {
      const response = await registerParticipantAPI(dataToSend);

      if (response.status === 401) {
        alert("Your session has expired. Please login again.");
        localStorage.removeItem("token");
        return;
      }

      if (response.data.success) {
        alert(`Registered for "${eventName}" successfully!`);
        setFormData({
          name: "",
          email: "",
          phone: "",
          place: "",
          college: "",
        });
      } else {
        alert("Registration failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Register error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: isLight ? "white" : "#121212",
          color: isLight ? "black" : "white",
          p: 4,
          transition: "0.3s ease",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            textAlign: "center",
            fontWeight: "bold",
            color: isLight ? "black" : "white",
          }}
        >
          Register for {eventName}
        </Typography>

        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: 500, margin: "0 auto" }}
        >
          {["name", "email", "phone", "place", "college"].map((field) => (
            <TextField
              key={field}
              fullWidth
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              type={field === "email" ? "email" : "text"}
              value={formData[field]}
              onChange={handleChange}
              required
              sx={{
                mb: 3,
                input: { color: isLight ? "black" : "white" },
                label: { color: isLight ? "black" : "#ffdd9b" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: isLight ? "black" : "#ffdd9b",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: isLight ? "black" : "#ffd56b",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: isLight ? "black" : "#ffdd9b",
                },
              }}
            />
          ))}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: isLight ? "black" : "#ffdd9b",
              color: isLight ? "white" : "black",
              mt: 1,
              "&:hover": {
                backgroundColor: isLight ? "#333" : "#e6c26d",
              },
            }}
          >
            Register
          </Button>
        </form>
      </Box>
    </>
  );
}
