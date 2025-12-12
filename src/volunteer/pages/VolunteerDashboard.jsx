import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import Navbar from "../../components/Navbar";
import { createVolunteerRequestAPI, payWaterAPI } from "../../services/allAPIs";

const VolunteerDashboard = () => {
  const [openModal, setOpenModal] = useState(null);

  const [stage, setStage] = useState("");
  const [bottles, setBottles] = useState("");

  const [medicalDescription, setMedicalDescription] = useState("");

  const handleOpen = (type) => setOpenModal(type);
  const handleClose = () => {
    setOpenModal(null);
    setStage("");
    setBottles("");
    setMedicalDescription("");
  };

  const getTokenHeader = () => {
    const token = localStorage.getItem("token"); 
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const handlePayNow = async () => {
    if (!stage || !bottles) return alert("Enter stage & number of bottles");

    try {
      const reqHeader = getTokenHeader();

      // Step 1: Create water request in backend
      await createVolunteerRequestAPI(
        {
          type: "water",
          stage,
          description: `Payment for ${bottles} bottles at stage ${stage}`,
          status: "Pending",
        },
        reqHeader
      );

      // Step 2: Proceed with Stripe payment
      const response = await payWaterAPI({ stage, bottles }, reqHeader);

      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        alert("Unable to create payment session");
      }
    } catch (error) {
      console.error("Payment Error:", error.response || error);
      alert("Payment failed. Try again.");
    }
  };

  const handleMedicalRequest = async () => {
    if (!medicalDescription) return alert("Please describe the issue");

    try {
      const token = localStorage.getItem("token");
      const reqHeader = token ? { Authorization: `Bearer ${token}` } : {};

      const requestBody = {
        type: "medical",
        description: medicalDescription,
        status: "Pending",
      };

      const response = await createVolunteerRequestAPI(requestBody, reqHeader);

      if (response.data?.success || response.data?.message === "Request created") {
        alert("Medical request sent successfully!");
        handleClose();
      } else {
        alert("Failed to send request.");
      }
    } catch (error) {
      console.error("Medical Request Error:", error.response?.data || error);
      alert("Something went wrong. Try again.");
    }
  };

  const cards = [
    {
      title: "Pay for Drinking Water",
      description: "Select stage and number of bottles to provide water immediately.",
      action: () => handleOpen("water"),
    },
    {
      title: "Immediate Medical Support",
      description: "Report an issue or request urgent medical assistance.",
      action: () => handleOpen("medical"),
    },
  ];

  return (
    <Box>
      <Navbar />

      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          How can we help?
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  "&:hover": { boxShadow: 6, cursor: "pointer" },
                }}
                onClick={card.action}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>{card.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{card.description}</Typography>
                </CardContent>
                <Button variant="contained" sx={{ mt: 2, backgroundColor: "beige" }}>Open</Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={openModal === "water"} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Pay for Drinking Water</DialogTitle>
          <DialogContent>
            <TextField label="Stage" fullWidth value={stage} onChange={(e) => setStage(e.target.value)} sx={{ mb: 2 }} />
            <TextField label="Number of Bottles" type="number" fullWidth value={bottles} onChange={(e) => setBottles(e.target.value)} sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary">Payment is securely processed via Stripe Checkout.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handlePayNow}>Proceed to Pay</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openModal === "medical"} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Immediate Medical Support</DialogTitle>
          <DialogContent>
            <TextField
              label="Describe the Issue"
              multiline
              rows={4}
              fullWidth
              sx={{ mb: 2 }}
              value={medicalDescription}
              onChange={(e) => setMedicalDescription(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="error" onClick={handleMedicalRequest}>Request Help</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default VolunteerDashboard;
