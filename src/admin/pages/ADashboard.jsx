import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

import Navbar from "../../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";
import { useThemeContext } from "../../ContextShareAPI/ThemeContext";
import { getAllUsersAPI } from "../../services/allAPIs";


import GroupsIcon from "@mui/icons-material/Groups";
import EventIcon from "@mui/icons-material/Event";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function ADashboard() {
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState(0);

  const { mode } = useThemeContext();
  const isLight = mode === "light";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsersAPI();
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const cardStyle = {
    p: 3,
    borderRadius: "14px",
    color: "white",
    "&:hover": { transform: "scale(1.03)", transition: "0.3s" },
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
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
            Admin Dashboard
          </Typography>

          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{
              mb: 3,
              "& .MuiTab-root": { fontWeight: 600 },
            }}
          >
            <Tab label="Overview" />
            <Tab label="Users" />
          </Tabs>

          {tab === 0 && (
            <Box>
             
              <Card
                sx={{
                  p: 3,
                  mb: 4,
                  backgroundColor: isLight ? "white" : "#1e1e1e",
                  borderRadius: "14px",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Welcome Back, <span style={{ color: "#ff7e40" }}>Admin!</span>
                </Typography>
                <Typography sx={{ mt: 1, opacity: 0.8 }}>
                  Here's a quick overview of your system.
                </Typography>
              </Card>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card
                    sx={{
                      ...cardStyle,
                      backgroundColor: "#ff7e40",
                    }}
                  >
                    <GroupsIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography>Total Users</Typography>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      {users.length}
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Card
                    sx={{
                      ...cardStyle,
                      backgroundColor: "#3b8c4d",
                    }}
                  >
                    <EventIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography>Total Organizers</Typography>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      {users.filter((u) => u.role === "organizer").length}
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Card
                    sx={{
                      ...cardStyle,
                      backgroundColor: "#d4a373",
                    }}
                  >
                    <PersonAddIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography>Participants</Typography>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      {users.filter((u) => u.role === "participant").length}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {tab === 1 && (
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Users List
              </Typography>

              {users.length === 0 ? (
                <Typography>No users found.</Typography>
              ) : (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: 2,
                  }}
                >
                  {users.map((user) => (
                    <Box
                      key={user._id}
                      sx={{
                        backgroundColor: isLight ? "white" : "#1e1e1e",
                        borderLeft: isLight
                          ? "4px solid black"
                          : "4px solid #ff7e40",
                        borderRadius: 2,
                        p: 2,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        maxWidth: 300,
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {user.name}
                      </Typography>

                      <Typography sx={{ color: isLight ? "#444" : "#ccc" }}>
                        Email: {user.email}
                      </Typography>

                      <Typography sx={{ color: isLight ? "#444" : "#ccc" }}>
                        Role: {user.role}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
