import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";


const ThemeContext = createContext();


export const useThemeContext = () => useContext(ThemeContext);


export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");


  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) setMode(savedMode);
  }, []);

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode);
      return newMode;
    });
  };


  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#ff7e40" },
          background:
            mode === "light"
              ? { default: "#f5f5f5", paper: "#fff" }
              : { default: "#121212", paper: "#1e1e1e" },
          text:
            mode === "light"
              ? { primary: "#000", secondary: "#555" }
              : { primary: "#fff", secondary: "#aaa" },
        },
        typography: {
          fontFamily: "Roboto, sans-serif",
        },
        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: mode === "light" ? "#000" : "#fff" },
                  "&:hover fieldset": { borderColor: "#ff7e40" },
                  "&.Mui-focused fieldset": { borderColor: "#ff7e40" },
                },
                "& label": { color: mode === "light" ? "#000" : "#fff" },
                "& input": { color: mode === "light" ? "#000" : "#fff" },
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
