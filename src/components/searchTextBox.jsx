import { Box, TextField } from "@mui/material";

const SearchTextBox = ({ title, value, setSearchText }) => {

  return (
    <Box
      sx={{
        height: "50px",
        width: { xs: "100%", md: "50%" },
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
      <Box sx={{ position: "absolute", top: 4, left: 20, fontSize: "12px", color: "grey" }}>{title}</Box>
      <TextField
        variant="outlined"
        value={value}
        onChange={(e) => {
          if (setSearchText) {
            setSearchText(e.target.value);
          }
        }}
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
  );
};

export default SearchTextBox;
