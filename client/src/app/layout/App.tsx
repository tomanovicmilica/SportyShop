import { useCallback, useEffect, useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './Header';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from './LoadingComponent';
import { useAppDispatch } from '../store/configureStore';
import { fetchCurrentUser } from '../../features/account/accountSlice';
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import HomePage from '../../features/home/HomePage';
import '@fontsource/roboto/500.css';


function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: (palleteType === 'light' ? '#bcaaa4' : '#121212')
      },
      primary: {
        main: '#8d6e63',
      },
      secondary: {
        main: '#4e342e',
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }


  return (
    <ThemeProvider theme={theme}>
        <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      {loading ? <LoadingComponent message="Initialising app..." />
          : location.pathname === '/' ? <HomePage />
          : <Container sx={{mt: 4}}>
              <Outlet />
            </Container>
      }

    </ThemeProvider>
  )
}

export default App;
