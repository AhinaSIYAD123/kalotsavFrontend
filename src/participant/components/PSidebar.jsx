import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Box,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../ContextShareAPI/ThemeContext";  

export default function PSidebar() {
  const { mode } = useThemeContext(); 
 
  const bgColor = mode === "light" ? "white" : "#121212";
  const textColor = mode === "light" ? "black" : "white";
  const hoverColor = mode === "light" ? "#e9e6dfff" : "#333";
  const borderColor = mode === "light" ? "#222" : "#555";

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          backgroundColor: bgColor,   
          color: textColor,           
          boxSizing: "border-box",
          borderRight: `1px solid ${borderColor}`,
          paddingTop: 2,
        },
      }}
    >
      <Toolbar />

      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          color: textColor,  
          mb: 3,
          fontWeight: 600,
        }}
      >
        Participant
      </Typography>

      <Box sx={{ overflow: "auto" }}>
        <List>

          <ListItemButton
            component={Link}
            to="/participant/upload"
            sx={{
              mx: 1,
              mb: 1,
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: hoverColor,  
                color: textColor,
              },
            }}
          >
            <ListItemText primary="Upload Performance" />
          </ListItemButton>

         
          <ListItemButton
            component={Link}
            to="/participant"
            sx={{
              mx: 1,
              mb: 1,
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: hoverColor, 
                color: textColor,
              },
            }}
          >
            <ListItemText primary="Settings" />
          </ListItemButton>

        </List>
      </Box>
    </Drawer>
  );
}
