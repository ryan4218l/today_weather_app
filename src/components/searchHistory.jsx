import React, { useEffect, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Stack, IconButton, Tooltip } from "@mui/material";

const SearchHistory = ({ weather, setSearchDetails }) => {
  const { city, country, temperature, highTemperature, lowTemperature, condition, description, humidity, dateTime, icon } = weather;

  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    if (city === "" || country === "") return;

    setSearchHistory((prevHistory) => {
      const newEntry = { city, country, temperature, highTemperature, lowTemperature, condition, humidity, dateTime, icon };
      const updatedHistory = [newEntry, ...prevHistory];
      sessionStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  }, [weather]);

  useEffect(() => {
    setSearchHistory((prevHistory) => {
      const storedHistory = sessionStorage.getItem("searchHistory");
      return storedHistory ? JSON.parse(storedHistory) : prevHistory;
    });
  }, []);

  const handleSearchWeather = (index) => {
    const selectedHistory = searchHistory[index];
    setSearchDetails({ city: selectedHistory.city, country: selectedHistory.country });
  };

  const handleDeleteWeather = (index) => {
    setSearchHistory((prevHistory) => {
      const updatedHistory = prevHistory.filter((_, i) => i !== index);
      sessionStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  return (
    <Box
      sx={{
        marginTop: "1rem",
        flex: 1,
        width: "100%",
        background: "rgba(255, 255, 255, 0.15)",
        borderRadius: "1rem",
        overflow: "auto",
        backdropFilter: "blur(0.5rem)",
      }}>
      <Box sx={{ padding: "1rem", fontWeight: 600 }}>Search History</Box>
      {searchHistory.length > 0 ? (
        <Box sx={{ px: "0.75rem", pb: "0.75rem" }}>
          {searchHistory.map((item, index) => (
            <Box
              key={index}
              sx={{
                mb: "0.5rem",
                p: "0.75rem",
                background: "rgba(255,255,255,0.25)",
                borderRadius: "0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.5rem",
              }}>
              {/* LEFT: Info */}
              <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "start", sm: "center" } }}>
                <Box sx={{ fontSize: "0.9rem", fontWeight: 500 }}>
                  {item.city}, {item.country}
                </Box>

                <Box sx={{ fontSize: "0.7rem", opacity: 0.7 }}>{new Date(item.dateTime).toLocaleString()}</Box>
              </Box>

              {/* RIGHT: Actions */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <IconButton
                  size="small"
                  sx={{
                    background: "rgba(255,255,255,0.8)",
                    "&:hover": { background: "white" },
                  }}
                  onClick={() => handleSearchWeather(index)}>
                  <SearchIcon fontSize="small" />
                </IconButton>

                <IconButton
                  size="small"
                  sx={{
                    background: "rgba(255,255,255,0.8)",
                    "&:hover": { background: "white" },
                  }}
                  onClick={() => handleDeleteWeather(index)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Box>
          ))}
        </Box>
      ) : (
        <Box sx={{ padding: "20px", color: "grey" }}>No search history available.</Box>
      )}
    </Box>
  );
};

export default SearchHistory;
