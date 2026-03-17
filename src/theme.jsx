import { createTheme } from "@mui/material/styles";

export const getGlassStyles = (theme) => ({
  background: theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.20)" : "rgba(20, 20, 30, 0.4)",
  boxShadow: theme.palette.mode === "light" ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "0 4px 30px rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(5px)",
  transition: "all 0.2s ease",
});

export const getTheme = (mode) => {
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: {
              default: "#f3e8ff",
              paper: "rgba(255,255,255,0.2)",
            },
            text: {
              primary: "black",
            },
          }
        : {
            background: {
              default: "#0f172a",
              paper: "rgba(30,41,59,0.4)",
            },
            text: {
              primary: "#f1f5f9",
            },
          }),
    },

    typography: {
      fontFamily: "Inter, sans-serif",
    },
  });

  theme.custom = {
    glass: getGlassStyles,
  };

  return theme;
};
