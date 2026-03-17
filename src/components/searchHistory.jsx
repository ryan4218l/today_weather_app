import React, { useEffect, useState, useCallback } from "react";

import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Stack, IconButton, Tooltip } from "@mui/material";

const STORAGE_KEY = "searchHistory";

const SearchHistory = ({ weather, setSearchDetails }) => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSearchHistory(JSON.parse(stored));
      }
    } catch {
      console.error("Failed to parse search history");
    }
  }, []);

  useEffect(() => {
    if (!weather?.city || !weather?.country) return;

    setSearchHistory((prev) => {
      const updated = [weather, ...prev].slice(0, 10);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [weather]);

  const handleSearchWeather = useCallback(
    (index) => {
      const item = searchHistory[index];
      setSearchDetails({ city: item.city, country: item.country });
    },
    [setSearchDetails, searchHistory],
  );

  const handleDeleteWeather = useCallback((index) => {
    setSearchHistory((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

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
      {searchHistory.length === 0 ? (
        <Box sx={{ padding: "20px", color: "grey" }}>No search history available.</Box>
      ) : (
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
              {/* Info */}
              <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "start", sm: "center" } }}>
                <Box sx={{ fontSize: "0.9rem", fontWeight: 500 }}>
                  {item.city}, {item.country}
                </Box>

                <Box sx={{ fontSize: "0.7rem", opacity: 0.7 }}>{new Date(item.dateTime).toLocaleString()}</Box>
              </Box>

              {/* Actions */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <Tooltip title="Search" placement="top">
                  <IconButton
                    size="small"
                    sx={{
                      background: "rgba(255,255,255,0.8)",
                      "&:hover": { background: "white" },
                    }}
                    onClick={() => handleSearchWeather(index)}>
                    <SearchIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete" placement="top">
                  <IconButton
                    size="small"
                    sx={{
                      background: "rgba(255,255,255,0.8)",
                      "&:hover": { background: "white" },
                    }}
                    onClick={() => handleDeleteWeather(index)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchHistory;
