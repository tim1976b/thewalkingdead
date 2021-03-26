import React from "react";
import { render } from "react-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from "react-redux"
import theme from './theme';
import { store } from "./store";
import App from "./components/severity-level";
import { fetchHospitals } from "./actions/hospitals";
import { fetchIllnesses } from "./actions/illnesses";

store.dispatch(fetchHospitals({ page: 0 }));
store.dispatch(fetchIllnesses());

render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <CssBaseline />
            <App />
        </Provider>
    </ThemeProvider>,
    document.getElementById("react-root")
);

if (module.hot) module.hot.accept();
