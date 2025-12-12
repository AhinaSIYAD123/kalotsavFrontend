import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, TextField } from "@mui/material";
import PSidebar from "../components/PSidebar";
import Navbar from "../../components/Navbar";
import { uploadVideoAPI, getVideosAPI } from "../../services/allAPIs";
import { useThemeContext } from "../../ContextShareAPI/ThemeContext";

export default function UploadVideo() {
  const { mode } = useThemeContext(); 

  const [video, setVideo] = useState(null);
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await getVideosAPI();
      if (res.data.success) setVideos(res.data.data);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  const handleUpload = (e) => setVideo(e.target.files[0]);

  const handleSubmit = async () => {
    if (!video) return alert("Please select a video first!");
    if (!category) return alert("Please enter a category!");

    const formData = new FormData();
    formData.append("video", video);
    formData.append("category", category);

    try {
      setUploading(true);
      const res = await uploadVideoAPI(formData);
      setUploading(false);

      if (res.data.success) {
        alert("Video uploaded successfully!");
        setVideo(null);
        setCategory("");
        fetchVideos();
      } else {
        alert("Upload failed: " + res.data.message);
      }
    } catch (err) {
      setUploading(false);
      alert("Upload failed. Check backend.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/videos/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setVideos(videos.filter((video) => video._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: mode === "light" ? "white" : "#121212",
        color: mode === "light" ? "black" : "white",
      }}
    >
      <Navbar />

      <Box sx={{ display: "flex" }}>
        <PSidebar />

        <Box sx={{ flexGrow: 1, p: 4, ml: "240px" }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
            Upload Performance
          </Typography>

          <Card
            sx={{
              backgroundColor: mode === "light" ? "white" : "#1e1e1e",
              borderRadius: 3,
              border: mode === "light" ? "2px solid black" : "2px solid #fff",
              p: 3,
              maxWidth: 600,
            }}
          >
            <CardContent>
              <Typography sx={{ mb: 2 }}>
                Select your performance video (MP4 / MOV)
              </Typography>

              <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundColor: mode === "light" ? "black" : "beige",
                  color: "blacl",
                  mb: 3,
                  "&:hover": {
                    backgroundColor: mode === "light" ? "#222" : "beige",
                  },
                }}
              >
                Choose File
                <input type="file" hidden accept="video/*" onChange={handleUpload} />
              </Button>

              {video && (
                <Typography sx={{ mb: 2 }}>Selected: {video.name}</Typography>
              )}

              <TextField
                fullWidth
                label="Category / Event Name"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{
                  mb: 3,
                  "& input": { color: mode === "light" ? "black" : "white" },
                  "& label": { color: mode === "light" ? "black" : "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: mode === "light" ? "black" : "white",
                    },
                    "&:hover fieldset": {
                      borderColor: mode === "light" ? "black" : "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "beige",
                    },
                  },
                }}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: mode === "light" ? "black" : "beige",
                  color: "black",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: mode === "light" ? "#222" : "#ff5a00",
                  },
                }}
                onClick={handleSubmit}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </CardContent>
          </Card>

        <Box sx={{ mt: 5 }}>
  <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
    Uploaded Videos
  </Typography>

  {videos.length === 0 ? (
    <Typography>No videos uploaded yet.</Typography>
  ) : (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 3,
      }}
    >
      {videos.map((v) => (
        <Card
          key={v._id}
          sx={{
            p: 2,
            border: mode === "light" ? "1px solid black" : "1px solid #fff",
            backgroundColor: mode === "light" ? "beige" : "#1e1e1e",
            maxWidth: 300,       
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>
            Category: {v.category}
          </Typography>

          <video width="100%" style={{ marginTop: 10 }} controls>
            <source src={v.videoUrl} type="video/mp4" />
          </video>

          <Button
            sx={{ mt: 1 }}
            variant="contained"
            color="error"
            onClick={() => handleDelete(v._id)}
          >
            Delete
          </Button>
        </Card>
      ))}
    </Box>
  )}
</Box>

        </Box>
      </Box>
    </Box>
  );
}
