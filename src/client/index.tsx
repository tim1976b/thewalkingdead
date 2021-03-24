import React from "react";
import { render } from "react-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import App from "./components/severity-level";

render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>,
    document.getElementById("react-root")
);

if (module.hot) module.hot.accept();
