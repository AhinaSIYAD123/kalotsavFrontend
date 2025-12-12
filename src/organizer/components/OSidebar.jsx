import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useThemeContext } from "../../ContextShareAPI/ThemeContext";


import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export default function OSidebar() {
  const { mode } = useThemeContext();
  const isLight = mode === "light";

  const location = useLocation(); 

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/organizer" },
    { text: "Manage Events", icon: <EventIcon />, path: "/organizer/events" },
    { text: "Publish Results", icon: <EmojiEventsIcon />, path: "/organizer/results" },
    { text: "Profile", icon: <ManageAccountsIcon />, path: "/organizer/settings" },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 250,
        "& .MuiDrawer-paper": {
          width: 250,
          background: isLight ? "white" : "#111",
          color: isLight ? "#222" : "#f9f9f9",
          borderRight: isLight ? "1px solid #170101ff" : "1px solid #333",
          paddingTop: 2,
          transition: "0.3s ease",
        },
      }}
    >
      <Toolbar />

      
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          mt: 2,
          mb: 2,
          fontWeight: 700,
          letterSpacing: 0.5,
          color: isLight ? "#222" : "#ffdd9b",
        }}
      >
        Organizer Panel
      </Typography>

      <Divider sx={{ mx: 2, background: isLight ? "#bbb" : "#444" }} />

      <Box sx={{ overflow: "auto", mt: 1 }}>
        <List>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <ListItemButton
                key={index}
                component={Link}
                to={item.path}
                sx={{
                  mx: 1,
                  my: 1,
                  borderRadius: "10px",
                  backgroundColor: isActive
                    ? isLight
                      ? "#ffdd9b"
                      : "#ff7e40"
                    : "transparent",
                  color: isActive
                    ? isLight
                      ? "#000"
                      : "#fff"
                    : isLight
                    ? "#333"
                    : "#ddd",
                  boxShadow: isActive ? "0px 2px 6px rgba(0,0,0,0.15)" : "none",
                  "&:hover": {
                    backgroundColor: isLight ? "#ffe5b6" : "#ff915e",
                    color: isLight ? "#000" : "#fff",
                    transform: "scale(1.02)",
                    transition: "0.2s ease",
                  },
                }}
              >
              
                <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                  {item.icon}
                </Box>

                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: "16px",
                    fontWeight: isActive ? 700 : 500,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}
