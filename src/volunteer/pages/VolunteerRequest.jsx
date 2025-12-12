import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
} from "@mui/material";

import { getVolunteerRequestsAPI, updateRequestStatusAPI } from "../../services/allAPIs";
import Navbar from "../../components/Navbar";
import { useThemeContext } from "../../ContextShareAPI/ThemeContext";

export default function VolunteerRequest() {
  const [requests, setRequests] = useState([]);

  const { mode } = useThemeContext();
  const isLight = mode === "light";

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token")?.replace(/"/g, "");
      const reqHeader = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await getVolunteerRequestsAPI(reqHeader);

      if (Array.isArray(response.data)) {
        setRequests(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem("token")?.replace(/"/g, "");
      const reqHeader = token ? { Authorization: `Bearer ${token}` } : {};

      await updateRequestStatusAPI(id, { status: "Accepted" }, reqHeader);

      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status: "Accepted" } : req))
      );
    } catch (error) {
      console.error("Failed to accept request:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: isLight ? "white" : "#121212",
        color: isLight ? "black" : "white",
        transition: "0.3s ease",
      }}
    >
      <Navbar />

      <Box sx={{ p: 4 }}>
        <Typography
          variant="h4"
          mb={4}
          textAlign="center"
          sx={{ color: isLight ? "black" : "white" }}
        >
          Volunteer Service Requests
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: isLight ? "white" : "#1e1e1e",
            transition: "0.3s ease",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {["Volunteer", "Type", "Stage", "Description", "Status", "Action"].map(
                  (head) => (
                    <TableCell
                      key={head}
                      sx={{ color: isLight ? "black" : "#ffdd9b", fontWeight: 600 }}
                    >
                      {head}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {requests.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{
                    backgroundColor: isLight ? "white" : "#2a2a2a",
                    transition: "0.3s ease",
                    "&:hover": {
                      backgroundColor: isLight ? "#f2f2f2" : "#333",
                    },
                  }}
                >
                  <TableCell sx={{ color: isLight ? "black" : "white" }}>{row.name}</TableCell>
                  <TableCell sx={{ color: isLight ? "black" : "white" }}>{row.type}</TableCell>
                  <TableCell sx={{ color: isLight ? "black" : "white" }}>
                    {row.stage || "N/A"}
                  </TableCell>
                  <TableCell sx={{ color: isLight ? "black" : "white" }}>
                    {row.description}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={row.status}
                      sx={{
                        backgroundColor:
                          row.status === "Pending"
                            ? "#ff5252"
                            : "#00c853",
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    {row.status === "Pending" && (
                      <Button
                        variant="contained"
                        onClick={() => handleAccept(row._id)}
                        sx={{
                          backgroundColor: "#ff3333",
                          "&:hover": { backgroundColor: "#cc0000" },
                        }}
                      >
                        Accept
                      </Button>
                    )}

                    {row.status === "Accepted" && (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#00c853",
                          "&:hover": { backgroundColor: "#009624" },
                        }}
                      >
                       
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
