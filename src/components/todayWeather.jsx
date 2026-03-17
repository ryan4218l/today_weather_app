import React, { useState, useEffect } from "react";

import { Alert, Box } from "@mui/material";

const TodayWeather = ({ weather, weatherError }) => {
  const { city, country, temperature, highTemperature, lowTemperature, condition, description, humidity, dateTime, icon } = weather;

  const [currentWeather, setCurrentWeather] = useState([
    {
      city: city,
      country: country,
      temperature: temperature,
      highTemperature: highTemperature,
      lowTemperature: lowTemperature,
      condition: condition,
      description: description,
      humidity: humidity,
      dateTime: dateTime,
      icon: icon,
    },
  ]);

  useEffect(() => {
    setCurrentWeather((prevHistory) => {
      const storedHistory = sessionStorage.getItem("searchHistory");
      console.log("storedHistory ", JSON.parse(storedHistory));
      return storedHistory ? JSON.parse(storedHistory)[0] : prevHistory;
    });
  }, []);

  return (
    <>
      <Box sx={{ fontSize: "18px", color: "black", fontWeight: "bold", marginBottom: "12px" }}>Today's Weather</Box>

      {currentWeather.temperature === null ? (
        <Box sx={{ height: "230px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {weatherError === null ? <Alert severity="info">Please Enter a City and Country to get the current weather</Alert> : <Alert severity="error">{weatherError}</Alert>}
        </Box>
      ) : (
        <Box sx={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Box
            component="img"
            src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
            alt={currentWeather.condition}
            sx={{ position: "absolute", top: -40, right: -20, width: { xs: "auto", sm: "200px", md: "320px" }, height: "auto", zIndex: -1 }}
          />
          <Box sx={{ color: "black", fontWeight: "bold" }}>
            {currentWeather.city}, {currentWeather.country}
          </Box>
          <Box sx={{ fontSize: "7rem", fontWeight: "bold" }}>{currentWeather.temperature}°</Box>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Box sx={{ fontSize: "14px", color: "grey" }}>H: {currentWeather.highTemperature}°C</Box>
            <Box sx={{ fontSize: "14px", color: "grey" }}>L: {currentWeather.lowTemperature}°C</Box>
          </Box>
          <Box sx={{}}>{currentWeather.condition}</Box>
          <Box sx={{}}>{currentWeather.humidity}% Humidity</Box>
          <Box sx={{ fontSize: "14px", color: "grey" }}>{new Date(currentWeather.dateTime).toLocaleString()}</Box>
        </Box>
      )}
    </>
  );
};

export default TodayWeather;
