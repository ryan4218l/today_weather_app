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

  const handleSearchWeather = (index) =>{
    const selectedHistory = searchHistory[index];
    setSearchDetails({ city: selectedHistory.city, country: selectedHistory.country });

  }

  const handleDeleteWeather = (index) => {
    setSearchHistory((prevHistory) => {
      const updatedHistory = prevHistory.filter((_, i) => i !== index);
      sessionStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      return updatedHistory;
    });

  }

  return (
    <Box
      sx={{
        marginTop: "20px",
        flex: 1,
        width: "100%",
        background: "rgba(255, 255, 255, 0.15)",
        borderRadius: "16px",
      }}>
      <Box sx={{ padding: "20px", color: "black" }}> Search History</Box>
      {searchHistory.length > 0 ? (
        <Box sx={{ padding: "20px", maxHeight: "100%", overflow: "auto" }}>
          {searchHistory.map((item, index) => (
            <Box
              key={index}
              sx={{
                marginBottom: "10px",
                padding: "20px",
                background: "rgba(255, 255, 255, 0.3)",
                borderRadius: "16px",
                maxHeight: "200px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Box>
                {item.city}, {item.country}
              </Box>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box>{new Date(item.dateTime).toLocaleString()}</Box>
                <Tooltip title="Search" placement="top">
                  <IconButton sx={{ backgroundColor: "white" }} onClick={()=>handleSearchWeather(index)}>
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete" placement="top">
                  <IconButton sx={{ backgroundColor: "white" }} onClick={() => handleDeleteWeather(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
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
