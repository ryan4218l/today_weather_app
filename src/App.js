import bgLight from "./assets/bg-light.png";
import bgDark from "./assets/bg-dark.png";

import { Box, IconButton, Stack, TextField, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function App() {
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
      <Stack direction="row" spacing={2} sx={{ width: "50%" }}>
        <Box
          sx={{
            height: "50px",
            width: "50%",
            background: "rgba(255, 255, 255, 0.18)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}>
          <Box sx={{ position: "absolute", top: 4, left: 20, fontSize: "12px", color: "grey" }}>Country</Box>
          <TextField
            variant="outlined"
            sx={{
              height: "100%",
              width: "100%",
              background: "none",
              borderRadius: "16px",
              border: "none",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />
        </Box>
        <Box
          sx={{
            height: "50px",
            width: "50%",
            background: "rgba(255, 255, 255, 0.18)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}>
          <Box sx={{ position: "absolute", top: 4, left: 20, fontSize: "12px", color: "grey" }}>City</Box>
          <TextField
            variant="outlined"
            sx={{
              height: "100%",
              width: "100%",
              background: "none",
              borderRadius: "16px",
              border: "none",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />
        </Box>
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
          <Tooltip title="Search" placement="top">
            <IconButton aria-label="search" sx={{ color: "white", borderRadius: "16px", height: "60px" }}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
      <Box
        sx={{
          height: "80%",
          width: "50%",
          background: "rgba(255, 255, 255, 0.18)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}>
        Today's Weather
      </Box>
    </Box>
  );
}

export default App;
