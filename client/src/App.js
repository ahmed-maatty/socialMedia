import { useSelector } from "react-redux";
import Layout from "./Layout/Layout";
import {themeSettings} from "./themes";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {createTheme} from "@mui/material/styles"

function App() {
  const {mode} = useSelector(state => state.app) ;
  const theme = useMemo( () => createTheme(themeSettings(mode)) , [mode] );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout />
    </ThemeProvider>
  );
}

export default App;
