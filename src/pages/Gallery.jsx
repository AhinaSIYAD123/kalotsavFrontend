import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card } from "@mui/material";
import Navbar from "../components/Navbar";
import { getVideosAPI } from "../services/allAPIs";
import { useThemeContext } from "../ContextShareAPI/ThemeContext"; 
import { serverURL } from "../services/serverURL"; // make sure to import serverURL
export default function Gallery() {
  const [videos, setVideos] = useState([]);
  const { mode } = useThemeContext();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await getVideosAPI();
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
  const cardBg = mode === "light" ? "#fff" : "#1a1a1a";
  const cardBorder = mode === "light" ? "#e0e0e0" : "#333";
  const videoBorder = mode === "light" ? "#ccc" : "#444";

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: pageBg, color: textColor }}>
      <Navbar />
      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1, color: "#d4a373" }}>
          Event Gallery
        </Typography>
        <Typography sx={{ color: textColor }}>
          A glimpse of the cultural celebration!
        </Typography>
      </Box>

      <Box sx={{ px: { xs: 2, md: 10 }, pb: 10 }}>
        <Grid container spacing={3}>
          {videos.map((vid) => (
            <Grid item xs={12} sm={6} md={4} key={vid._id}>
              <Card
                sx={{
                  backgroundColor: cardBg,
                  border: `1px solid ${cardBorder}`,
                  borderRadius: 3,
                  overflow: "hidden",
                  p: 2,
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                    transition: "0.3s",
                  },
                }}
              >
                <video
                  src={`${serverURL}${vid.videoUrl}`}
                  controls
                  style={{
                    width: "100%",
                    height: "250px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    border: `1px solid ${videoBorder}`,
                  }}
                />
                <Typography sx={{ mt: 1, fontWeight: "bold", color: textColor }}>
                  {vid.name}
                </Typography>
                <Typography sx={{ color: "#aaa" }}>{vid.category}</Typography>
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