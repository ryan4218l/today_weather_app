import { useState } from "react";

import { Box, IconButton, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import bgLight from "./assets/bg-light.png";
import bgDark from "./assets/bg-dark.png";
import TodayWeather from "./components/todayWeather";
import SearchHistory from "./components/searchHistory";
import SearchTextBox from "./components/searchTextBox";
import { GEOCODING_API_URL, WEATHER_API_URL } from "./constant";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

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
    <Box
      sx={{
        backgroundImage: `url(${bgLight})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}>
      <Stack direction={"row"} spacing={2} sx={{ width: { xs: "70%", lg: "50%" }, alignItems: "flex-end" }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: "100%" }}>
          <SearchTextBox title="City" value={searchDetails.city} setSearchText={(city) => setSearchDetails({ ...searchDetails, city })} />
          <SearchTextBox title="Country" value={searchDetails.country} setSearchText={(country) => setSearchDetails({ ...searchDetails, country })} />
        </Stack>
        <Box
          sx={{
            height: "50px",
            background: "rgba(165, 55,253, 1)",
            borderRadius: "16px",
            border: "1px solid rgba(165, 55,253, 1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <IconButton aria-label="search" sx={{ color: "white", borderRadius: "16px", height: "60px" }} onClick={() => handleSearchWeather(searchDetails)}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Stack>
      <Box
        sx={{
          height: "60%",
          width: { xs: "70%", lg: "50%" },
          background: "rgba(255, 255, 255, 0.18)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          padding: { xs: "20px", md: "30px" },
          display: "flex",
          flexDirection: "column",
        }}>
        <TodayWeather weather={weather} weatherError={weatherError} />
        <SearchHistory
          weather={weather}
          setSearchDetails={(data) => {
            handleSearchWeather(data);
          }}
        />
      </Box>
    </Box>
  );
}

export default App;
