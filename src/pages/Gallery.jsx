import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card } from "@mui/material";
import Navbar from "../components/Navbar";
import { getVideosAPI } from "../services/allAPIs";
import { useThemeContext } from "../ContextShareAPI/ThemeContext"; 
export default function Gallery() {
  const [videos, setVideos] = useState([]);
  const { mode } = useThemeContext(); 
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await getVideosAPI();
      console.log("Videos response:", res);
      if (res.data.success) {
        setVideos(res.data.data);
      } else {
        console.error("Failed to fetch videos:", res.data.message);
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  const pageBg = mode === "light" ? "#f9f9f9" : "#121212";
  const textColor = mode === "light" ? "#000" : "#fff";
  const subtitleColor = mode === "light" ? "#555" : "#aaa";
  const cardBg = mode === "light" ? "#fff" : "#1e1e1e";

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: pageBg, color: textColor }}>
      <Navbar />
      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          Event Gallery
        </Typography>
        <Typography variant="body1" sx={{ color: subtitleColor }}>
          A glimpse of the cultural celebration!
        </Typography>
      </Box>

      <Box sx={{ px: { xs: 2, md: 10 }, pb: 10 }}>
        <Grid container spacing={3}>
          {videos.map((vid) => (
            <Grid item xs={12} sm={6} md={4} key={vid._id}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  p: 2,
                  backgroundColor: cardBg,
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                    transition: "0.3s",
                  },
                }}
              >
                <video
                  src={`http://localhost:5000${vid.videoUrl}`}
                  controls
                  style={{
                    width: "100%",
                    height: "250px",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
                <Typography sx={{ mt: 1, fontWeight: "bold", color: textColor }}>
                  {vid.name}
                </Typography>
                <Typography sx={{ color: subtitleColor }}>{vid.category}</Typography>
              </Card>
            </Grid>
          ))}
          {videos.length === 0 && (
            <Typography sx={{ mt: 5, width: "100%", textAlign: "center" }}>
              No videos uploaded yet.
            </Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
