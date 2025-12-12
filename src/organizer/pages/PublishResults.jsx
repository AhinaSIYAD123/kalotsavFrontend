import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OSidebar from "../components/OSidebar";
import Navbar from "../../components/Navbar";
import { createResultAPI } from "../../services/allAPIs";
import { useThemeContext } from "../../ContextShareAPI/ThemeContext";

function PublishResults() {
  const { mode } = useThemeContext();
  const isLight = mode === "light";

  const [participants, setParticipants] = useState([
    { participantName: "", eventName: "", score: "", rank: "" },
  ]);

  const addParticipant = () => {
    setParticipants([
      ...participants,
      { participantName: "", eventName: "", score: "", rank: "" },
    ]);
  };

  const deleteParticipant = (index) => {
    if (window.confirm(`Are you sure you want to delete Participant #${index + 1}?`)) {
      setParticipants(participants.filter((_, i) => i !== index));
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...participants];
    updated[index][field] = value;
    setParticipants(updated);
  };

 const handlePublish = async (index) => {
  const participant = participants[index];

  if (
    participant.participantName === "" ||
    participant.eventName === "" ||
    participant.score === "" ||
    participant.rank === ""
  ) {
    alert("Please fill all fields for this participant before publishing!");
    return;
  }

  try {
    await createResultAPI(participant);
    alert(`Result for Participant #${index + 1} Published!`);

    // Clear this participant's data
    const updated = [...participants];
    updated[index] = { participantName: "", eventName: "", score: "", rank: "" };
    setParticipants(updated);

  } catch (err) {
    console.error(err);
    alert("Error publishing result");
  }
};

const handlePublishAll = async () => {
  for (let i = 0; i < participants.length; i++) {
    const p = participants[i];
    if (
      p.participantName === "" ||
      p.eventName === "" ||
      p.score === "" ||
      p.rank === ""
    ) {
      alert(`Please fill all fields for Participant #${i + 1} before publishing all!`);
      return;
    }
  }

  try {
    await Promise.all(participants.map((p) => createResultAPI(p)));
    alert("All results published!");

    // Reset all participants
    setParticipants([{ participantName: "", eventName: "", score: "", rank: "" }]);

  } catch (err) {
    console.error(err);
    alert("Error publishing results");
  }
};


  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: isLight ? "white" : "#121212",
        transition: "0.3s ease",
      }}
    >
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <OSidebar />

        <Box
          sx={{
            flexGrow: 1,
            p: 4,
            ml: "240px",
            color: isLight ? "black" : "white",
            transition: "0.3s ease",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              color: isLight ? "black" : "white",
              fontWeight: 600,
              transition: "0.3s",
            }}
          >
            Publish Results
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {participants.map((p, index) => (
              <Grid item xs={12} sm={10} md={6} lg={4} key={index}>
                <Card
                  sx={{
                    maxWidth: 350,
                    margin: "0 auto",
                    backgroundColor: isLight ? "#333" : "#1e1e1e",
                    border: isLight ? "1px solid #d4a373" : "1px solid #ff7e40",
                    borderRadius: "12px",
                    transition: "0.3s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.4)",
                    },
                  }}
                >
                  <CardContent sx={{ padding: "16px", position: "relative" }}>
                    <IconButton
                      size="small"
                      onClick={() => deleteParticipant(index)}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: isLight ? "white" : "#ff7e40",
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>

                    <Typography
                      sx={{
                        color: isLight ? "beige" : "#ffdd9b",
                        fontSize: "16px",
                        mb: 1,
                        fontWeight: 600,
                      }}
                    >
                      Participant #{index + 1}
                    </Typography>

                    <TextField
                      label="Participant Name"
                      fullWidth
                      value={p.participantName}
                      onChange={(e) =>
                        handleChange(index, "participantName", e.target.value)
                      }
                      size="small"
                      sx={{
                        mb: 1,
                        input: { color: "white" },
                        label: { color: isLight ? "beige" : "#ffdd9b" },
                      }}
                    />

                    <TextField
                      label="Event Name"
                      fullWidth
                      value={p.eventName}
                      onChange={(e) =>
                        handleChange(index, "eventName", e.target.value)
                      }
                      size="small"
                      sx={{
                        mb: 1,
                        input: { color: "white" },
                        label: { color: isLight ? "beige" : "#ffdd9b" },
                      }}
                    />

                    <TextField
                      label="Marks / Score"
                      type="number"
                      fullWidth
                      value={p.score}
                      onChange={(e) => handleChange(index, "score", e.target.value)}
                      size="small"
                      sx={{
                        mb: 1,
                        input: { color: "white" },
                        label: { color: isLight ? "beige" : "#ffdd9b" },
                      }}
                    />

                    <TextField
                      label="Rank"
                      type="number"
                      fullWidth
                      value={p.rank}
                      onChange={(e) => handleChange(index, "rank", e.target.value)}
                      size="small"
                      sx={{
                        mb: 1,
                        input: { color: "white" },
                        label: { color: isLight ? "beige" : "#ffdd9b" },
                      }}
                    />

                    <Button
                      variant="contained"
                      fullWidth
                      size="small"
                      onClick={() => handlePublish(index)}
                      sx={{
                        mt: 1,
                        backgroundColor: isLight ? "green" : "#1faa1f",
                        "&:hover": {
                          backgroundColor: isLight ? "#0f7b0f" : "#178b17",
                        },
                      }}
                    >
                      Publish Result
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "flex-start",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              onClick={addParticipant}
              sx={{
                backgroundColor: isLight ? "#333" : "#01060d",
                color: "white",
                border: isLight ? "1px solid #d4a373" : "1px solid #ff7e40",
                "&:hover": {
                  backgroundColor: isLight ? "#444" : "#050d18",
                },
              }}
            >
              Add Result
            </Button>

            <Button
              variant="contained"
              onClick={handlePublishAll}
              sx={{
                backgroundColor: isLight ? "black" : "#ff7e40",
                color: "white",
                "&:hover": {
                  backgroundColor: isLight ? "#01060d" : "#ff8a55",
                },
              }}
            >
              Publish All
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PublishResults;
