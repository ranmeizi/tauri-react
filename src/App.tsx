import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "./App.css";
import routes from "./routes";
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { deepmerge } from '@mui/utils'
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { useEffect, useState } from 'react';

const router = createBrowserRouter(routes)

const themeSelector = (state: RootState) => state.theme

function App() {
  const theme = useSelector(themeSelector)

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
