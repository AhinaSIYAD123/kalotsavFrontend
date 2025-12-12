import React from "react";
import { Grid, Typography } from "@mui/material";
import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {
  const role = "user"; 

  const dashboards = {
    admin: [
      { title: "Admin Dashboard", description: "Manage the platform", link: "/admin/dashboard" },
    ],
    organizer: [
      { title: "Organizer Dashboard", description: "Manage events & volunteers", link: "/organizer/dashboard" },
    ],
    participant: [
      { title: "Participant Dashboard", description: "Register & upload performance", link: "/participant/dashboard" },
    ],
    volunteer: [
      { title: "Volunteer Dashboard", description: "Manage support & logistics", link: "/volunteer/dashboard" },
    ],
    user: [
      { title: "User Dashboard", description: "Watch videos & view results", link: "/user/dashboard" },
    ],
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>Welcome</Typography>
      <Grid container spacing={3}>
        {dashboards[role].map((dash, index) => (
          <Grid item xs={12} md={4} key={index}>
            <DashboardCard {...dash} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
