import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DashboardCard = ({ title, description, link }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        minHeight: "150px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#1A1A1A",
        color: "white",
        padding: "1rem",
        cursor: "pointer",
        "&:hover": { transform: "scale(1.03)", transition: "0.3s" },
      }}
      onClick={() => navigate(link)}
    >
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" sx={{ marginTop: "0.5rem" }}>
          {description}
        </Typography>
      </CardContent>
      <Button
        variant="contained"
        sx={{ alignSelf: "flex-start", backgroundColor: "#E53935" }}
      >
        Go
      </Button>
    </Card>
  );
};

export default DashboardCard;
