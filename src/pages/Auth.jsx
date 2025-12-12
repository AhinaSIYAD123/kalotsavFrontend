import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { loginUserAPI, registerUserAPI, googleLoginAPI } from "../services/allAPIs";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
const handleGoogleResponse = async (resp) => {
  const decoded = jwtDecode(resp.credential);

  const googleUser = {
    name: decoded.name,
    email: decoded.email,
    googleId: decoded.sub,
    picture: decoded.picture,
  };

  try {
    const res = await googleLoginAPI(googleUser);

    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      const role = res.data.user.role;

      if (role === "admin") navigate("/admin/dashboard");
      if (role === "organizer") navigate("/organizer");
      if (role === "volunteer") navigate("/volunteer/request");
      if (role === "participant") navigate("/");
    }
  } catch (err) {
    alert("Google login failed");
    console.log(err);
  }
};


  useEffect(() => {
   
    if (window.google) {
      google.accounts.id.initialize({
        client_id:
          "807833999204-9qofh34ujsoi9vu2kb9413r513m8b0lh.apps.googleusercontent.com",
        callback: handleGoogleResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("googleLoginDiv"),
        { theme: "filled_black", size: "large", width: "100%" }
      );
    }
  }, []);



  // ---------- FORM INPUT ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };


  const handleLogin = async () => {
    if (!userData.email || !userData.password) {
      alert("Please enter email & password");
      return;
    }

    try {
      const res = await loginUserAPI({
        email: userData.email,
        password: userData.password,
      });

      if (res.status === 200) {
        const { user, token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);

        if (user.role === "admin") navigate("/admin/dashboard");
        if (user.role === "organizer") navigate("/organizer");
        if (user.role === "volunteer") navigate("/volunteer/request");
        if (user.role === "participant") navigate("/");
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };


  const handleRegister = async () => {
    if (!userData.fullName || !userData.email || !userData.password) {
      alert("All fields required");
      return;
    }

    try {
      const res = await registerUserAPI({
        name: userData.fullName,
        email: userData.email,
        password: userData.password,
      });

      if (res.status === 200 || res.status === 201) {
        alert("Registered successfully! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert("Registration failed");
    }
  };


  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/png-abstract-wavy-earthy-tones-texture-transparent-background_53876-846832.jpg?semt=ais_hybrid&w=740&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 5,
          borderRadius: 3,
          backgroundColor: "rgba(75, 69, 69, 0.85)",
          backdropFilter: "blur(3px)",
          color: "black",
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
        >
          {isLogin ? "Welcome Back" : "Create Account"}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {!isLogin && (
            <TextField
              label="Full Name"
              name="fullName"
              value={userData.fullName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          )}

          <TextField
            label="Email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={userData.password}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />

          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              fontWeight: "bold",
            }}
            fullWidth
            onClick={isLogin ? handleLogin : handleRegister}
          >
            {isLogin ? "Login" : "Register"}
          </Button>

          {/* ------ GOOGLE LOGIN BUTTON ------ */}
          <div id="googleLoginDiv" style={{ width: "100%", marginTop: 10 }}></div>
        </Box>

        <Typography sx={{ textAlign: "center", mt: 3, color: "#444" }}>
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <MuiLink
                sx={{ color: "black", cursor: "pointer", fontWeight: "bold" }}
                onClick={() => setIsLogin(false)}
              >
                Register
              </MuiLink>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <MuiLink
                sx={{ color: "black", cursor: "pointer", fontWeight: "bold" }}
                onClick={() => setIsLogin(true)}
              >
                Login
              </MuiLink>
            </>
          )}
        </Typography>
      </Paper>
    </Box>
  );
}
