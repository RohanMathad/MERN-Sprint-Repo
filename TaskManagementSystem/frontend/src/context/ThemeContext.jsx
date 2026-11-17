import { useState } from 'react';
import { ThemeProvider, createGlobalStyle, useTheme } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    transition: all 0.2s ease-in-out;
  }
`;

const lightTheme = {
    colors: {
        background: '#f8f9fa',
        surface: '#ffffff',
        primary: '#0d6efd',
        text: '#212529',
        textSecondary: '#6c757d',
        border: '#dee2e6',
    },
};

const darkTheme = {
    colors: {
        background: '#212529',
        surface: '#343a40',
        primary: '#0d6efd',
        text: '#f8f9fa',
        textSecondary: '#adb5bd',
        border: '#495057',
    },
};

export const AppThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(true); // Temperory Dark mode enabled!

    const toggleTheme = () => setIsDarkMode(!isDarkMode);
    const activeTheme = {
        ...(isDarkMode ? darkTheme : lightTheme),
        isDarkMode,
        toggleTheme,
    };

    return (
        <ThemeProvider theme={activeTheme}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    );
};

export const useAppTheme = () => useTheme();