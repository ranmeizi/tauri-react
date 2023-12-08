import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "./App.css";
import routes from "./routes";
import { ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const router = createBrowserRouter(routes)

const themeSelector = (state: RootState) => state.theme.theme

function App() {
  const theme = useSelector(themeSelector)
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
