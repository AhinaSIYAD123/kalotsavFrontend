import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Box,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useThemeContext } from "../../ContextShareAPI/ThemeContext";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import SettingsIcon from "@mui/icons-material/Settings";

export default function AdminSidebar({
  adminProfileFile,
  adminProfileURL,
  adminName,
}) {
  const location = useLocation();
  const { mode } = useThemeContext();

  const isLight = mode === "light";

  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    { label: "Notifications", icon: <PeopleIcon />, path: "/admin/manage-users" },
    { label: "Add Event", icon: <EventIcon />, path: "/admin/event-approval" },
    { label: "Admin Settings", icon: <SettingsIcon />, path: "/admin/settings" },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        "& .MuiDrawer-paper": {
          width: 240,
          backgroundColor: isLight ? "white" : "#1e1e1e",
          color: isLight ? "black" : "white",
          borderRight: isLight ? "2px solid #d6d2b5" : "2px solid #444",
        },
      }}
    >
      
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          paddingY: 2,
          flexDirection: "column",
        }}
      >
        

        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: isLight ? "black" : "white",
          }}
        >
          {adminName || "Admin Panel"}
        </Typography>
      </Toolbar>

      <Box sx={{ overflow: "auto", mt: 2 }}>
        <List>
          {menuItems.map((item, index) => {
            const active = location.pathname === item.path;

            return (
              <ListItemButton
                key={index}
                component={Link}
                to={item.path}
                sx={{
                  backgroundColor: active
                    ? isLight
                      ? "#E6E1C5"
                      : "#333"
                    : "transparent",
                  borderRight: active
                    ? isLight
                      ? "4px solid black"
                      : "4px solid #ff7e40"
                    : "4px solid transparent",
                  "&:hover": {
                    backgroundColor: isLight ? "#EFEBD3" : "#2a2a2a",
                  },
                }}
              >
                <Box
                  sx={{
                    mr: 2,
                    color: isLight ? "black" : "white",
                  }}
                >
                  {item.icon}
                </Box>

                <ListItemText primary={item.label} />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}
