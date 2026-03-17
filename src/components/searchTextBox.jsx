import { Box, TextField } from "@mui/material";
import { useCallback } from "react";

const SearchTextBox = ({ title, value = "", setSearchText }) => {
  const handleSearchTextChange = useCallback(
    (e) => {
      if (setSearchText) {
        setSearchText(e.target.value);
      }
    },
    [setSearchText],
  );

  return (
    <Box
      sx={(theme) => ({
        ...theme.custom.glass(theme),
        height: "3.125rem",
        width: { xs: "100%", md: "50%" },
        position: "relative",
        display: "flex",
        alignItems: "center",
        borderRadius: "1rem",
      })}>
      {/* Label */}
      <Box
        sx={(theme) => ({
          position: "absolute",
          top: "0.25rem",
          left: "1rem",
          fontSize: "0.75rem",
          color: theme.palette.mode === "light" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)",
          pointerEvents: "none",
        })}>
        {title}
      </Box>

      <TextField
        variant="outlined"
        value={value}
        onChange={handleSearchTextChange}
        fullWidth
        sx={(theme) => ({
          height: "100%",
          "& .MuiInputBase-root": {
            height: "100%",
            borderRadius: "1rem",
            background: "transparent",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& input": {
            padding: "1.25rem 1rem 0.5rem",
            fontSize: "0.9rem",
            color: theme.palette.mode === "light" ? "#000" : "#fff",
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px transparent inset",
            WebkitTextFillColor: theme.palette.mode === "light" ? "#000" : "#fff",
            caretColor: theme.palette.mode === "light" ? "#000" : "#fff",
            borderRadius: "1rem",
            transition: "background-color 9999s ease-in-out 0s",
          },
          "& input:-webkit-autofill:focus": {
            WebkitBoxShadow: "0 0 0 1000px transparent inset",
          },
        })}
      />
    </Box>
  );
};

export default SearchTextBox;
