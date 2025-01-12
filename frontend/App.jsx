import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from './components/TopBar';
import { Container } from "@material-ui/core";
import { createTheme, ThemeProvider } from '@material-ui/core';
import AdventureStory from "./components/AdventureStory";
import ReadWriteLander from './components/ReadWriteLander';
import AboutPage from "./components/About";

const theme = createTheme({
  palette: {
    primary: {
      main: '#381e99'
    },
    secondary: {
      main: '#f4a2fd'
    }
  },
  typography: {
    fontFamily: [
      'Roboto',
    ].join(','),
  },
});



export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container style={{ marginTop: '3rem' }} >
          <TopBar theme={theme} />
          <Routes>

            <Route
              path="/"
              element={<ReadWriteLander />}
            />
            <Route
              path="/story"
              element={<AdventureStory />}
            />
            <Route
              path="/about"
              element={<AboutPage />}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider >

  );
}
