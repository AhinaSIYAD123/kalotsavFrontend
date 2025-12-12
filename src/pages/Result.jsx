import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import { getAllResultsAPI } from "../services/allAPIs";

export default function Result() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await getAllResultsAPI();
        const resultsArray = res.data ? res.data : res;

        const sorted = resultsArray.sort((a, b) => a.rank - b.rank);
        setResults(sorted);
      } catch (err) {
        console.log(err);
      }
    };

    fetchResults();
  }, []);

  const top3 = results.slice(0, 3);
  const others = results.slice(3);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
      
      <Navbar />

      <Box sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
          Event Results
        </Typography>

        <Grid container spacing={3} sx={{ mb: 5 }}>
          {top3.map((res, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {index === 0
                      ? "1st Place"
                      : index === 1
                      ? "2nd Place"
                      : "3rd Place"}
                  </Typography>

                  <Typography sx={{ mt: 1, fontSize: "18px" }}>
                    {res.participantName}
                  </Typography>
                  <Typography>Event: {res.eventName}</Typography>
                  <Typography>Score: {res.score}</Typography>
                  <Typography>Rank: {res.rank}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {others.map((res, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                    {res.participantName}
                  </Typography>
                  <Typography>Event: {res.eventName}</Typography>
                  <Typography>Score: {res.score}</Typography>
                  <Typography>Rank: {res.rank}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
