import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import routes from "./routes";
import {
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
  colors,
  createTheme,
} from "@mui/material";
import { deepmerge } from "@mui/utils";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { useEffect, useState, useMemo } from "react";
import { useRxState } from "./db/hook/useRxState";
import * as DaoAppConfig from "@/db/dao/AppConfig";

const router = createBrowserRouter(routes);

const themeSelector = (state: RootState) => state.theme;

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
  // const theme = useSelector(themeSelector);
  const primary = useRxState(
    DaoAppConfig.Query.get_primary().$
  ) as unknown as keyof typeof colorObj;

  const theme = useMemo<ThemeOptions>(() => {
    return {
      palette: {
        mode: "dark",
        x_shadow_color: {
          light: "#000",
          dark: "#aaa",
        },
        // primary: primary && colorObj[primary],
        ...(primary ? { primary: colorObj[primary] } : {}),
      },
    };
  }, [primary]);

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
