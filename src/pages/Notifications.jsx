import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { getNotificationsAPI } from "../services/allAPIs";
import Navbar from "../components/Navbar";
import { useThemeContext } from "../ContextShareAPI/ThemeContext"; 
export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const { mode } = useThemeContext();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await getNotificationsAPI();
      setNotifications(res.data.notifications || []);
      console.log("Notifications fetched:", res.data.notifications);
    } catch (err) {
      console.error(err);
    }
  };

  const pageBg = mode === "light" ? "white" : "#121212";
  const textColor = mode === "light" ? "black" : "white";
  const cardBg = mode === "light" ? "#FFF8DC" : "#1e1e1e";
  const cardBorder = mode === "light" ? "black" : "#d4a373";

  return (
    <>
      <Navbar />

      <Box
        sx={{
          padding: 4,
          backgroundColor: pageBg,
          minHeight: "100vh",
          color: textColor,
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={3} color={textColor}>
          Notifications
        </Typography>

        {notifications.length === 0 ? (
          <Typography color={textColor}>No notifications yet.</Typography>
        ) : (
          notifications.map((n) => (
            <Card
              key={n._id}
              sx={{
                backgroundColor: cardBg,
                color: textColor,
                mb: 2,
                borderLeft: `4px solid ${cardBorder}`,
              }}
            >
              <CardContent>
                <Typography variant="body1" color={textColor}>
                  {n.message}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </>
  );
}
