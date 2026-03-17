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
      sx={{
        height: "3.125rem",
        width: { xs: "100%", md: "50%" },
        position: "relative",
        display: "flex",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.18)",
        borderRadius: "1rem",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 0.25rem 1.875rem rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(0.3125rem)",
        WebkitBackdropFilter: "blur(0.3125rem)",
      }}>
      {/* Label */}
      <Box
        sx={{
          position: "absolute",
          top: "0.25rem",
          left: "1rem",
          fontSize: "0.75rem",
          color: "grey",
          pointerEvents: "none",
        }}>
        {title}
      </Box>

      <TextField
        variant="outlined"
        value={value}
        onChange={handleSearchTextChange}
        fullWidth
        sx={{
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
            color: "#000",
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px transparent inset",
            WebkitTextFillColor: "#000",
            caretColor: "#000",
            borderRadius: "1rem",
            transition: "background-color 9999s ease-in-out 0s",
          },
          "& input:-webkit-autofill:focus": {
            WebkitBoxShadow: "0 0 0 1000px transparent inset",
          },
        }}
      />
    </Box>
  );
};

export default SearchTextBox;
