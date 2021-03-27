import React from "react";
import { render } from "react-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from "react-redux"
import theme from './theme';
import { store } from "./store";
import App from "./components/app";
import { fetchHospitals } from "./actions/hospitals";
import { fetchIllnesses } from "./actions/illnesses";

// XXX inital fetch , check they dont block critical render path
//store.dispatch(fetchHospitals({ page: 0 })); // XXX no need to initalally fetch hospitals , it's of dynamic nature and should be fetch and filtered by on user selection 
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
