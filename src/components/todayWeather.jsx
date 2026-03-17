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
    setCurrentWeather({
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
    });
  }, [weather]);

  useEffect(() => {
    // if (currentWeather.temperature === null) {
    setCurrentWeather((prevHistory) => {
      const storedHistory = sessionStorage.getItem("searchHistory");
      return storedHistory ? JSON.parse(storedHistory)[0] : prevHistory;
    });
    // }
  }, []);

  return (
    <>
      <Box sx={{ fontSize: "1rem", color: "black", fontWeight: "bold", marginBottom: "12px" }}>Today's Weather</Box>
      {currentWeather.temperature === null ? (
        <Box sx={{ height: "230px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {weatherError === null ? <Alert severity="info">Please Enter a City and Country to get the current weather</Alert> : <Alert severity="error">{weatherError}</Alert>}
        </Box>
      ) : (
        <Box sx={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          {/* Weather Icon */}
          <Box
            component="img"
            src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
            alt={currentWeather.condition}
            sx={{ position: "absolute", top: -60, right: -30, width: { xs: "7.5rem", sm: "11rem", md: "16rem" }, height: "auto", opacity: 0.9, zIndex: -1 }}
          />

          {/* City & Country */}
          <Box sx={{ fontSize: "1.125rem", fontWeight: 600, letterSpacing: "0.5px", zIndex: 1 }}>
            {currentWeather.city}, {currentWeather.country}
          </Box>

          {/* Temperature */}
          <Box
            sx={{
              fontSize: { xs: "3.5rem", md: "5.5rem" },
              fontWeight: 700,
              lineHeight: 1,
              background: "linear-gradient(135deg, #6a5acd, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              zIndex: 1,
            }}>
            {currentWeather.temperature}°
          </Box>

          {/* Condition */}
          <Box sx={{ fontSize: "1rem", opacity: 0.8, textTransform: "capitalize", zIndex: 1 }}>{currentWeather.condition}</Box>

          {/* High / Low */}
          <Box sx={{ display: "flex", gap: "1rem", marginTop: "8px", zIndex: 1 }}>
            <Box sx={{ fontSize: "0.875rem", opacity: 0.7 }}>H: {currentWeather.highTemperature}°C</Box>
            <Box sx={{ fontSize: "0.875rem", opacity: 0.7 }}>L: {currentWeather.lowTemperature}°C</Box>
          </Box>

          {/* Extra Info */}
          <Box sx={{ fontSize: "0.875rem", opacity: 0.75, zIndex: 1 }}>💧 {currentWeather.humidity}% Humidity</Box>

          {/* Date */}
          <Box sx={{ fontSize: "0.875rem", opacity: 0.6, marginTop: "6px", zIndex: 1 }}>{new Date(currentWeather.dateTime).toLocaleString()}</Box>
        </Box>
      )}
    </>
  );
};

export default TodayWeather;
