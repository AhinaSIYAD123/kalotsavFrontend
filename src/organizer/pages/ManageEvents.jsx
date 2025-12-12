
import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import Navbar from "../../components/Navbar";
import OSidebar from "../components/OSidebar";
import { getAllParticipantsAPI } from "../../services/allAPIs";
import { useThemeContext } from "../../ContextShareAPI/ThemeContext";

export default function ManageEvents() {
  const { mode } = useThemeContext();
  const isLight = mode === "light";

  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    setLoading(true);
    try {
      const res = await getAllParticipantsAPI();
      console.log("API response:", res);

      if (res?.data?.success) {
        setParticipants(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const events = participants.reduce((acc, p) => {
    if (!acc[p.eventName]) acc[p.eventName] = [];
    acc[p.eventName].push(p);
    return acc;
  }, {});

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: isLight ? "white" : "#121212",
        color: isLight ? "black" : "white",
        transition: "0.3s ease",
      }}
    >
      <Navbar />

      <Box sx={{ display: "flex" }}>
        <OSidebar />

    
        <Box sx={{ flexGrow: 1, p: 4, ml: "240px" }}>
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 600,
              color: isLight ? "black" : "white",
              transition: "0.3s ease",
            }}
          >
            Manage Events & Participants
          </Typography>

          {loading ? (
            <Typography>Loading participants...</Typography>
          ) : Object.keys(events).length === 0 ? (
            <Typography>No registrations found.</Typography>
          ) : (
            Object.keys(events).map((eventName, idx) => (
              <Box key={idx} sx={{ mb: 5 }}>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: isLight ? "black" : "#ffdd9b",
                    transition: "0.3s ease",
                  }}
                >
                  {eventName}
                </Typography>

                <Grid container spacing={3}>
                  {events[eventName].map((p) => (
                    <Grid item xs={12} md={6} lg={4} key={p._id}>
                      <Card
                        sx={{
                          backgroundColor: isLight ? "#222" : "#1e1e1e",
                          color: "white",
                          borderRadius: "12px",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                          transition: "0.3s ease",
                          "&:hover": {
                            transform: "scale(1.03)",
                            boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
                          },
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {p.name}
                          </Typography>
                          <Typography>Email: {p.email}</Typography>
                          <Typography>Phone: {p.phone}</Typography>
                          <Typography>Place: {p.place}</Typography>
                          <Typography>College: {p.college}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}
