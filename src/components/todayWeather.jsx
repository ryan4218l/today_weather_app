import { useState, useEffect } from "react";

import { Alert, Box } from "@mui/material";

const TodayWeather = ({ weather, weatherError }) => {
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    if (weather && weather.temperature !== null) {
      setCurrentWeather(weather);
    }
  }, [weather]);

  useEffect(() => {
    const storedHistory = sessionStorage.getItem("searchHistory");

    if (storedHistory) {
      try {
        const parsed = JSON.parse(storedHistory);

        if (Array.isArray(parsed) && parsed.length > 0) {
          setCurrentWeather(parsed[0]);
        }
      } catch (error) {
        console.error("Invalid sessionStorage data");
      }
    }
  }, []);

  const hasWeather = currentWeather && currentWeather.temperature !== null && currentWeather.temperature !== undefined;

  return (
    <>
      <Box
        sx={(theme) => ({
          fontSize: "1rem",
          fontWeight: "bold",
          marginBottom: "0.75rem",
          color: theme.palette.mode === "light" ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.9)",
        })}>
        Today's Weather
      </Box>
      {!hasWeather ? (
        <Box
          sx={{
            height: "14rem",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          {weatherError ? <Alert severity="error">{weatherError}</Alert> : <Alert severity="info">Please enter a City and Country to get the current weather</Alert>}
        </Box>
      ) : (
        <Box sx={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          {/* Weather Icon */}
          {currentWeather?.icon && (
            <Box
              component="img"
              src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
              alt={currentWeather.condition || "weather icon"}
              sx={{
                position: "absolute",
                top: "-3.5rem",
                right: "-2rem",
                width: { xs: "7.5rem", sm: "11rem", md: "16rem" },
                opacity: 0.9,
                zIndex: -1,
              }}
            />
          )}

          {/* City & Country */}
          <Box sx={{ fontSize: "1.125rem", fontWeight: 600, letterSpacing: "0.5px", zIndex: 1 }}>
            {currentWeather.city || "-"}, {currentWeather.country || "-"}
          </Box>

          {/* Temperature */}
          <Box
            sx={(theme) => ({
              fontSize: { xs: "3.5rem", md: "5.5rem" },
              fontWeight: 700,
              lineHeight: 1,
              background: theme.palette.mode === "light" ? "linear-gradient(135deg, #6a5acd, #a855f7)" : "linear-gradient(135deg, #c084fc, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              zIndex: 1,
            })}>
            {currentWeather.temperature ?? "--"}°
          </Box>

          {/* Description */}
          <Box sx={{ fontSize: "1rem", opacity: 0.8, textTransform: "capitalize", zIndex: 1 }}>{currentWeather.description || "--"}</Box>

          {/* High / Low */}
          <Box sx={{ display: "flex", gap: "1rem", marginTop: "8px", zIndex: 1 }}>
            <Box sx={{ fontSize: "0.875rem", opacity: 0.7 }}>H: {currentWeather.highTemperature ?? "--"}°C</Box>
            <Box sx={{ fontSize: "0.875rem", opacity: 0.7 }}>L: {currentWeather.lowTemperature ?? "--"}°C</Box>
          </Box>

          {/* Extra Info */}
          <Box sx={{ fontSize: "0.875rem", opacity: 0.75, zIndex: 1 }}>💧 {currentWeather.humidity ?? "--"}% Humidity</Box>

          {/* Date */}
          <Box sx={{ fontSize: "0.875rem", opacity: 0.6, marginTop: "6px", zIndex: 1 }}>{currentWeather.dateTime ? new Date(currentWeather.dateTime).toLocaleString() : "-"}</Box>
        </Box>
      )}
    </>
  );
};

export default TodayWeather;
