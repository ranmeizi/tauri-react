import * as C from "@/CONSTANTS";
import * as DaoAppConfig from "@/db/dao/AppConfig";
import {
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
  colors,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { useRxState } from "./db/hook/useRxState";
import { AppConfigProvider } from "./contexts/AppConfig";
import routes from "./routes";

const router = createBrowserRouter(routes);

const colorObj = {
  amber: colors["amber"],
  blue: colors["blue"],
  blueGrey: colors["blueGrey"],
  brown: colors["brown"],
  cyan: colors["cyan"],
  deepOrange: colors["deepOrange"],
  deepPurple: colors["deepPurple"],
  green: colors["green"],
  grey: colors["grey"],
  indigo: colors["indigo"],
  lightBlue: colors["lightBlue"],
  lightGreen: colors["lightGreen"],
  lime: colors["lime"],
  orange: colors["orange"],
  pink: colors["pink"],
  purple: colors["purple"],
  red: colors["red"],
  teal: colors["teal"],
  yellow: colors["yellow"],
};

function App() {
  const theme = useCreateTheme();

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <CssBaseline />
      <AppConfigProvider>
        <RouterProvider router={router} />
      </AppConfigProvider>
    </ThemeProvider>
  );
}

export default App;

function useCreateTheme(): ThemeOptions {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const primary = useRxState(
    DaoAppConfig.Observers.get_config(C.APP_CONFIG_STORAGE_KEY_PRIMARY)
  ) as unknown as { value: keyof typeof colorObj };
  const mode = useRxState(
    DaoAppConfig.Observers.get_config(C.APP_CONFIG_STORAGE_KEY_MODE)
  );

  const theme = useMemo<ThemeOptions>(() => {
    return {
      palette: {
        mode: mode ? mode.value : prefersDarkMode ? "dark" : "light",
        x_header_color: mode?.value === "dark" ? "#1f2020" : "#d6e3fb",
        x_shadow_color: mode?.value === "dark" ? "#aaa" : "#000",
        x_tab_view: {
          ...(mode?.value === "dark"
            ? {
                tabActive: "#2b2b2b",
                tabHover: "#1b4a74",
              }
            : {
                tabActive: "#fff",
                tabHover: "#aec7f6",
              }),
        },
        ...(primary ? { primary: colorObj[primary?.value || "blue"] } : {}),
      },
    };
  }, [primary, mode]);
  return theme;
}
