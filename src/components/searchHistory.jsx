import React, { useEffect, useState, useCallback } from "react";

import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Stack, IconButton } from "@mui/material";

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
      sx={(theme) => ({
        background: theme.palette.mode === "light" ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)",
        marginTop: "1rem",
        flex: 1,
        // height: "50%",
        width: "100%",
        borderRadius: "0.75rem",
        // overflow: "hidden",
        "&::-webkit-scrollbar": {
          width: "8px",
        },

        "&::-webkit-scrollbar-track": {
          background: theme.palette.mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)",
          borderRadius: "10px",
        },

        "&::-webkit-scrollbar-thumb": {
          background: theme.palette.mode === "light" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.3)",
          borderRadius: "10px",
          transition: "background 0.2s ease",
        },

        "&::-webkit-scrollbar-thumb:hover": {
          background: theme.palette.mode === "light" ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.5)",
        },
      })}>
      {/* Title */}
      <Box
        sx={(theme) => ({
          padding: "1rem",
          fontWeight: 600,
          color: theme.palette.mode === "light" ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.9)",
        })}>
        Search History
      </Box>

      <Box
        sx={(theme) => ({
          maxHeight: { xs: "11rem", md: "20rem" },
          overflowY: "auto",
          px: "0.75rem",
          pb: "0.75rem",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: theme.palette.mode === "light" ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.3)",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: theme.palette.mode === "light" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.5)",
          },
          scrollbarWidth: "thin",
          scrollbarColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.3) transparent" : "rgba(255,255,255,0.4) transparent",
        })}>
        {searchHistory.length === 0 ? (
          <Box
            sx={(theme) => ({
              padding: "1.25rem",
              color: theme.palette.mode === "light" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)",
            })}>
            No search history available.
          </Box>
        ) : (
          <Box sx={{ px: "0.75rem", pb: "0.75rem" }}>
            {searchHistory.map((item, index) => (
              <Box
                key={index}
                sx={(theme) => ({
                  ...theme.custom.glass(theme),
                  mb: "0.5rem",
                  p: "0.75rem",
                  borderRadius: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.5rem",

                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: theme.palette.mode === "light" ? "0 4px 15px rgba(0,0,0,0.1)" : "0 4px 20px rgba(0,0,0,0.4)",
                  },
                })}>
                {/* Info */}
                <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "start", sm: "center" } }}>
                  <Box sx={{ fontSize: "0.9rem", fontWeight: 500 }}>
                    {item.city}, {item.country}
                  </Box>

                  <Box sx={{ fontSize: "0.7rem", opacity: 0.7 }}>{new Date(item.dateTime).toLocaleString()}</Box>
                </Box>

                {/* Actions */}
                <Stack direction={"row"} spacing={1}>
                  <IconButton
                    aria-label="search"
                    size="small"
                    onClick={() => handleSearchWeather(index)}
                    sx={(theme) => ({
                      borderRadius: "50%",
                      border: theme.palette.mode === "light" ? "1px solid rgba(255,255,255,0)" : "1px solid rgba(255,255,255,0.6)",
                      background: theme.palette.mode === "light" ? "rgba(255,255,255,0.8)" : "none",
                      color: theme.palette.mode === "light" ? "grey" : "rgba(255,255,255,0.6)",
                      "&:hover": {
                        background: theme.palette.mode === "light" ? "#fff" : "rgba(255,255,255,0.25)",
                      },
                    })}>
                    <SearchIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    aria-label="Delete"
                    size="small"
                    onClick={() => handleDeleteWeather(index)}
                    sx={(theme) => ({
                      borderRadius: "50%",
                      border: theme.palette.mode === "light" ? "1px solid rgba(255,255,255,0)" : "1px solid rgba(255,255,255,0.6)",
                      background: theme.palette.mode === "light" ? "rgba(255,255,255,0.8)" : "none",
                      color: theme.palette.mode === "light" ? "grey" : "rgba(255,255,255,0.6)",
                      "&:hover": {
                        background: theme.palette.mode === "light" ? "#fff" : "rgba(255,255,255,0.25)",
                      },
                    })}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchHistory;
