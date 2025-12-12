import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
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
      <Typography variant="h3" color="green" gutterBottom>
        Payment Successful! ✅
      </Typography>
      <Typography variant="h6" gutterBottom>
        Thank you for your contribution.
      </Typography>
      <Button
        variant="contained"
        color="beige"
        onClick={() => navigate("/")}
      >
        Go Back to Home
      </Button>
    </Box>
  );
};

export default PaymentSuccess;
