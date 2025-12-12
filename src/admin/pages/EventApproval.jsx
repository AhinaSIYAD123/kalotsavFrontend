import React, { useState } from "react";
import { Box, Typography, Card, CardContent, TextField, Button } from "@mui/material";

import Navbar from "../../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";
import { addEventAPI } from "../../services/allAPIs";
import { useThemeContext } from "../../ContextShareAPI/ThemeContext";

export default function AddEvent() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [adding, setAdding] = useState(false);


  const { mode } = useThemeContext();
  const isLight = mode === "light";

  const handleAddEvent = async () => {
    if (!name || !category) return alert("Event name and category are required!");

    try {
      setAdding(true);
      const res = await addEventAPI({ name, category, img: imgUrl });
      setAdding(false);

      if (res.data.success) {
        alert("Event added successfully!");
        setName("");
        setCategory("");
        setImgUrl("");
      } else {
        alert("Failed to add event: " + res.data.message);
      }
    } catch (err) {
      setAdding(false);
      console.error(err);
      alert("Error adding event. Check backend.");
    }
  };

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
        <AdminSidebar />

        <Box
          sx={{
            ml: "240px",
            flexGrow: 1,
            p: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 700,
              color: isLight ? "black" : "white",
            }}
          >
            Add New Event
          </Typography>

          <Card
            sx={{
              maxWidth: 600,
              p: 3,
              borderRadius: 3,
              border: isLight ? "1px solid #d4a373" : "1px solid #ff7e40", 
              backgroundColor: isLight ? "white" : "#1e1e1e",
              color: isLight ? "black" : "white",
            }}
          >
            <CardContent>
            
              <TextField
                fullWidth
                label="Event Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  mb: 2,
                  input: { color: isLight ? "black" : "white" },
                  label: { color: isLight ? "black" : "white" },
                  "& .MuiOutlinedInput-root fieldset": {
                    borderColor: isLight ? "#333" : "#aaa",
                  },
                }}
              />

              <TextField
                fullWidth
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{
                  mb: 2,
                  input: { color: isLight ? "black" : "white" },
                  label: { color: isLight ? "black" : "white" },
                  "& .MuiOutlinedInput-root fieldset": {
                    borderColor: isLight ? "#333" : "#aaa",
                  },
                }}
              />

             
              <TextField
                fullWidth
                label="Image URL"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                sx={{
                  mb: 3,
                  input: { color: isLight ? "black" : "white" },
                  label: { color: isLight ? "black" : "white" },
                  "& .MuiOutlinedInput-root fieldset": {
                    borderColor: isLight ? "#333" : "#aaa",
                  },
                }}
              />

              <Button
                fullWidth
                variant="contained"
                onClick={handleAddEvent}
                disabled={adding}
                sx={{
                  fontWeight: 600,
                  backgroundColor: isLight ? "#d4a373" : "white",
                  color: "black",
                  "&:hover": {
                    backgroundColor: isLight ? "#c49a6c" : "#e56d36",
                  },
                }}
              >
                {adding ? "Adding..." : "Add Event"}
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
