import React, { useMemo, useState, useEffect } from "react";
import { Box, IconButton, Stack, ThemeProvider, CssBaseline } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { getTheme } from "./theme";
import bgLight from "./assets/bg-light.png";
import bgDark from "./assets/bg-dark.png";
import TodayWeather from "./components/todayWeather";
import SearchHistory from "./components/searchHistory";
import SearchTextBox from "./components/searchTextBox";
import { GEOCODING_API_URL, WEATHER_API_URL } from "./constant";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const getInitialMode = () => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) return savedMode;

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const [searchDetails, setSearchDetails] = useState({
    city: "",
    country: "",
  });

  const handleSearchWeather = async (data = searchDetails) => {
    const { city, country } = data;

    if (!city || !country) {
      // console.log("Please enter city and country");
      return;
    }

    try {
      // Geocoding API (get lat & lon)
      const geoResponse = await fetch(`${GEOCODING_API_URL}?q=${city},${country}&limit=1&appid=${API_KEY}`);

      const geoData = await geoResponse.json();

      if (!geoData.length) {
        throw new Error("Invalid city or country");
      }

      const { lat, lon } = geoData[0];

      // Weather API (using lat & lon)
      const weatherResponse = await fetch(`${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

      const weatherData = await weatherResponse.json();

      // set current weather data
      setWeather({
        city: weatherData.name,
        country: weatherData.sys.country,
        temperature: Math.round(weatherData.main.temp),
        highTemperature: Math.round(weatherData.main.temp_max),
        lowTemperature: Math.round(weatherData.main.temp_min),
        condition: weatherData.weather[0].main,
        description: weatherData.weather[0].description,
        humidity: weatherData.main.humidity,
        dateTime: new Date(), //  current date time
        icon: weatherData.weather[0].icon,
      });
      setSearchDetails({ city: "", country: "" });
    } catch (error) {
      setSearchDetails({ city: "", country: "" });
      setWeatherError(error.message);
    }
  };

  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temperature: null,
    highTemperature: null,
    lowTemperature: null,
    condition: "",
    description: "",
    humidity: null,
    dateTime: null,
    icon: null,
  });

  const [weatherError, setWeatherError] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: (theme) => `url(${theme.palette.mode === "light" ? bgLight : bgDark})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          position: "relative",
        }}>
        <IconButton
          onClick={toggleTheme}
          sx={{
            position: "absolute",
            bottom: 15,
            right: 15,
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
          }}>
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        <Stack direction={"row"} spacing={2} sx={{ width: { xs: "70%", lg: "50%" }, alignItems: "flex-end" }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: "100%" }}>
            <SearchTextBox title="City" value={searchDetails.city} setSearchText={(city) => setSearchDetails({ ...searchDetails, city })} />
            <SearchTextBox title="Country" value={searchDetails.country} setSearchText={(country) => setSearchDetails({ ...searchDetails, country })} />
          </Stack>
          <Box
            sx={(theme) => ({
              height: "3.125rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: theme.palette.mode === "light" ? "linear-gradient(135deg, #7c3aed, #c084fc)" : "linear-gradient(135deg, #6a5acd, #a855f7)",
              transition: "all 0.25s ease",
            })}>
            <IconButton
              aria-label="Search"
              onClick={() => handleSearchWeather(searchDetails)}
              sx={(theme) => ({
                color: "#fff",
                borderRadius: "1rem",
                height: "3.125rem",
                width: "3.125rem",

                "&:hover": {
                  transform: "scale(1.05)",
                  backgroundColor: "transparent",
                },

                "&:active": {
                  transform: "scale(0.95)",
                },
              })}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Stack>
        <Box
          sx={(theme) => ({
            ...theme.custom.glass(theme),
            height: "fit-content",
            width: { xs: "70%", lg: "50%" },
            borderRadius: "2rem",
            padding: { xs: "20px", md: "30px" },
            display: "flex",
            flexDirection: "column",
          })}>
          <TodayWeather weather={weather} weatherError={weatherError} />
          <SearchHistory
            weather={weather}
            setSearchDetails={(data) => {
              handleSearchWeather(data);
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
