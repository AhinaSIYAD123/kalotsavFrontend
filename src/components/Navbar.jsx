import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Avatar
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useThemeContext } from "../ContextShareAPI/ThemeContext";

export default function Navbar() {
  const { mode, toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const role = localStorage.getItem("role");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/auth");
  };

  const openMenu = (e) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const goToProfile = () => {
    if (role === "admin") navigate("/admin/dashboard");
    else if (role === "participant") navigate("/participant");
    else if (role === "volunteer") navigate("/volunteer/request");
    else if (role === "organizer") navigate("/organizer");
    else navigate("/");
    closeMenu();
  };

  const textColor = mode === "light" ? "#000" : "#fff";
  const buttonHoverColor = "#ff7e40";

  return (
    <AppBar
      position="static"
      sx={{
        background: mode === "light" ? "white" : "#121212",
        color: textColor,
        paddingY: 1,

        borderBottom: mode === "light" ? "2px solid black" : "2px solid ", 
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            cursor: "pointer",
            letterSpacing: 1.5,
            background: "linear-gradient(90deg, #ff7e40, #ff4500)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          onClick={() => navigate("/")}
        >
          Kalovault
        </Typography>

        <div style={{ display: "flex", alignItems: "center" }}>
          {[{ label: "Home", path: "/" }, { label: "Events", path: "/events" }, { label: "Gallery", path: "/gallery" }].map(
            (item) => (
              <Button
                key={item.label}
                sx={{
                  color: textColor,
                  fontSize: "15px",
                  mx: 1,
                  "&:hover": { color: buttonHoverColor },
                }}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Button>
            )
          )}

          <Tooltip title="Help / Volunteer">
            <IconButton
              sx={{ color: textColor, ml: 2, "&:hover": { color: buttonHoverColor } }}
              onClick={() => navigate("/volunteer/dashboard")}
            >
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton
              sx={{ color: textColor, ml: 1, "&:hover": { color: buttonHoverColor } }}
              onClick={() => navigate("/notifications")}
            >
              <NotificationsActiveIcon />
            </IconButton>
          </Tooltip>

          <IconButton sx={{ color: textColor, ml: 2 }} onClick={toggleTheme}>
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {isLoggedIn && (
            <>
              <IconButton sx={{ ml: 2 }} onClick={openMenu}>
                <Avatar sx={{ width: 34, height: 34 }} />
              </IconButton>

              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
                <MenuItem onClick={goToProfile} sx={{ color: textColor }}>Profile</MenuItem>
                <MenuItem
                  onClick={() => {
                    closeMenu();
                    handleLogout();
                  }}
                  sx={{ color: textColor }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}

          {!isLoggedIn && (
            <Button
              variant="outlined"
              onClick={() => navigate("/auth")}
              sx={{
                borderColor: buttonHoverColor,
                color: buttonHoverColor,
                ml: 2,
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: buttonHoverColor,
                  color: textColor === "#000" ? "#000" : "#fff",
                  borderColor: buttonHoverColor,
                },
              }}
            >
              Login
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
