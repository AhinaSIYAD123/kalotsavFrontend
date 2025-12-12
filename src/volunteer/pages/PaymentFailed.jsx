import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" color="error" gutterBottom>
        Payment Failed 
      </Typography>
      <Typography variant="h6" gutterBottom>
        Something went wrong. Please try again.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/volunteer/dashboard")}
      >
        Go Back to Dashboard
      </Button>
    </Box>
  );
};

export default PaymentFailed;
