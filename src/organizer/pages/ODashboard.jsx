import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import OSidebar from "../components/OSidebar";
import Navbar from "../../components/Navbar";
import { useThemeContext } from "../../ContextShareAPI/ThemeContext";

import EventIcon from "@mui/icons-material/Event";
import GroupsIcon from "@mui/icons-material/Groups";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

export default function ODashboard() {
  const { mode } = useThemeContext();
  const isLight = mode === "light";

  const cardBg = isLight ? "#333" : "#1e1e1e";
  const borderColor = isLight ? "#d4a373" : "#ff7e40";
  const textColor = isLight ? "beige" : "#ffdd9b";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: isLight ? "#fafafa" : "#121212",
        color: isLight ? "black" : "white",
      }}
    >
      <Navbar />

      <Box sx={{ display: "flex" }}>
        <OSidebar />

        <Box sx={{ flexGrow: 1, p: 4, ml: "250px" }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
            Organizer Dashboard
          </Typography>

          <Card
            sx={{
              p: 3,
              mb: 4,
              backgroundColor: isLight ? "white" : "#1e1e1e",
              borderRadius: "14px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Welcome Back, <span style={{ color: "#ff7e40" }}>Organizer!</span>
            </Typography>
            <Typography sx={{ mt: 1, opacity: 0.8 }}>
              Here’s a quick overview of today’s activities.
            </Typography>
          </Card>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  backgroundColor: "#ff7e40",
                  color: "white",
                  p: 3,
                  borderRadius: "14px",
                  "&:hover": {
                    transform: "scale(1.03)",
                    transition: "0.3s",
                  },
                }}
              >
                <EventIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography>Total Events</Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  12
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  backgroundColor: "#3b8c4d",
                  color: "white",
                  p: 3,
                  borderRadius: "14px",
                  "&:hover": {
                    transform: "scale(1.03)",
                    transition: "0.3s",
                  },
                }}
              >
                <GroupsIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography>Volunteers</Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  45
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  backgroundColor: "#d4a373",
                  color: "white",
                  p: 3,
                  borderRadius: "14px",
                  "&:hover": {
                    transform: "scale(1.03)",
                    transition: "0.3s",
                  },
                }}
              >
                <PendingActionsIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography>Pending Entries</Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  18
                </Typography>
              </Card>
            </Grid>
          </Grid>

          {/* TWO COLUMNS SECTION */}
          <Grid container spacing={4} sx={{ mt: 3 }}>
            {/* RECENT ACTIVITIES */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  p: 3,
                  backgroundColor: isLight ? "white" : "#1e1e1e",
                  borderRadius: "14px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 2, color: textColor }}
                >
                  Recent Activities
                </Typography>

                <List>
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsActiveIcon sx={{ color: "#ff7e40" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="New event 'Group Dance' added."
                      secondary="2 hours ago"
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <NotificationsActiveIcon sx={{ color: "#3b8c4d" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Volunteer Alex updated schedule."
                      secondary="5 hours ago"
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <NotificationsActiveIcon sx={{ color: "#d4a373" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="3 new participants registered."
                      secondary="Yesterday"
                    />
                  </ListItem>
                </List>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  p: 3,
                  backgroundColor: isLight ? "white" : "#1e1e1e",
                  borderRadius: "14px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 2, color: textColor }}
                >
                  Quick Actions
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    sx={{
                      backgroundColor: "#ff7e40",
                      "&:hover": { backgroundColor: "#e56f32" },
                    }}
                  >
                    Manage Event
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<ListAltIcon />}
                    sx={{
                      backgroundColor: "#3b8c4d",
                      "&:hover": { backgroundColor: "#327a43" },
                    }}
                  >
                    Publish Result
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<PendingActionsIcon />}
                    sx={{
                      backgroundColor: "#d4a373",
                      "&:hover": { backgroundColor: "#c0905e" },
                    }}
                  >
                    Check Pending Entries
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
