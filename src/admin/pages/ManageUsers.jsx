import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
} from "@mui/material";

import Navbar from "../../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";
import { getNotificationsAPI, addNotificationAPI } from "../../services/allAPIs";
import { useThemeContext } from "../../ContextShareAPI/ThemeContext";

export default function ManageUsers() {
  const [notifications, setNotifications] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const { mode } = useThemeContext();
  const isLight = mode === "light";

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await getNotificationsAPI();
      setNotifications(res.notifications || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddNotification = async (e) => {
    e.preventDefault();
    if (!title || !message) return alert("Fill both fields");

    try {
      await addNotificationAPI({ title, message });
      setTitle("");
      setMessage("");
      fetchNotifications();
      alert("Notification sent successfully!");
    } catch (err) {
      alert("Failed to send notification");
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

        <Box sx={{ ml: "240px", flexGrow: 1, p: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, mb: 4, color: isLight ? "black" : "white" }}
          >
            Send Notifications
          </Typography>

         
          <Card
            sx={{
              width: "60%",
              backgroundColor: isLight ? "white" : "#1e1e1e",
              p: 3,
              borderRadius: 3,
              border: isLight ? "1px solid #d4a373" : "1px solid #ff7e40", 
            }}
          >
            <CardContent>
              <TextField
                label="Title"
                fullWidth
                sx={{
                  mb: 3,
                  input: { color: isLight ? "black" : "white" },
                  label: { color: isLight ? "black" : "white" },
                  "& .MuiOutlinedInput-root fieldset": {
                    borderColor: isLight ? "#333" : "#bbb",
                  },
                }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <TextField
                label="Message"
                fullWidth
                multiline
                rows={4}
                sx={{
                  mb: 3,
                  input: { color: isLight ? "black" : "white" },
                  label: { color: isLight ? "black" : "white" },
                  "& .MuiOutlinedInput-root fieldset": {
                    borderColor: isLight ? "#333" : "#bbb",
                  },
                }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <Button
                variant="contained"
                onClick={handleAddNotification}
                sx={{
                  backgroundColor: isLight ? "#d4a373" : "white",
                  color: "black",
                  "&:hover": {
                    backgroundColor: isLight ? "#c49a6c" : "#e56d36",
                  },
                }}
              >
                Send Notification
              </Button>
            </CardContent>
          </Card>

         
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h5"
              sx={{ mb: 2, color: isLight ? "black" : "white" }}
            >
              Sent Notifications
            </Typography>

            {notifications.map((n) => (
              <Card
                key={n._id}
                sx={{
                  mb: 2,
                  p: 2,
                  backgroundColor: isLight ? "#EFEBD3" : "#1e1e1e",
                  border: isLight ? "1px solid #ccc" : "1px solid #555",
                  color: isLight ? "black" : "white",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {n.title}
                </Typography>
                <Typography variant="body2">{n.message}</Typography>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
