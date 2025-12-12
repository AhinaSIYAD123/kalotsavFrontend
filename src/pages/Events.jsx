import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
} from "@mui/material";
import Navbar from "../components/Navbar";

import { getEventsAPI } from "../services/allAPIs";
import { searchContext } from "../ContextShareAPI/ContextShare";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../ContextShareAPI/ThemeContext"; 

export default function Events() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState({});
  const { searchKey, setSearchKey } = useContext(searchContext);
  const { mode } = useThemeContext(); 
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getEventsAPI();
      if (res.data.success) {
        const grouped = res.data.data.reduce((acc, event) => {
          if (!acc[event.category]) acc[event.category] = [];
          acc[event.category].push(event);
          return acc;
        }, {});
        setCategories(grouped);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegisterClick = (eventName) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to register!");
      navigate("/auth");
      return;
    }
    navigate("/register", { state: { eventName } });
  };

  const pageBg = mode === "light" ? "#f5f5f5" : "#121212";
  const textColor = mode === "light" ? "#000" : "#fff";
  const cardBg = mode === "light" ? "#fff" : "#1a1a1a";
  const cardBorder = mode === "light" ? "#d4a373" : "#d4a373";
  const cardText = mode === "light" ? "#000" : "#fff";

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: pageBg, color: textColor }}>
      <Navbar />

      <Box sx={{ p: 4 }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mb: 3, color: "#d4a373", fontWeight: 700 }}
        >
          Kalotsavam Events
        </Typography>

        <TextField
          fullWidth
          placeholder="Search events..."
          variant="outlined"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          sx={{
            mb: 4,
            input: { color: textColor }
           
          }}
        />

        {Object.keys(categories).map((category, idx) => {
          const filteredEvents = categories[category].filter((e) =>
            e.name.toLowerCase().includes(searchKey.toLowerCase())
          );
          if (filteredEvents.length === 0) return null;

          return (
            <Box key={idx} sx={{ mb: 5 }}>
              <Typography
                variant="h5"
                sx={{ mb: 2, color: "#e4b97f", fontWeight: 700 }}
              >
                {category}
              </Typography>

              <Grid container spacing={3}>
                {filteredEvents.map((event, index) => (
                  <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <Card
                      sx={{
                        backgroundColor: cardBg,
                        border: `1px solid ${cardBorder}`,
                        borderRadius: "16px",
                        transition: "0.3s",
                        "&:hover": {
                          transform: "scale(1.04)"
                          
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="160"
                        image={event.img}
                        alt={event.name}
                      />
                      <CardContent sx={{ textAlign: "center" }}>
                        <Typography
                          variant="h6"
                          sx={{ color: cardText, fontWeight: 600, mb: 2, minHeight: "60px" }}
                        >
                          {event.name}
                        </Typography>
                        <Button
                          onClick={() => handleRegisterClick(event.name)}
                          variant="contained"
                          sx={{
                            backgroundColor: "#d4a373",
                            color: "black",
                            fontWeight: 600,
                            "&:hover": { backgroundColor: "#c49a6c" },
                          }}
                        >
                          Register
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
