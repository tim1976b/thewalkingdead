import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#295186',
        },
        secondary: {
            main: '#968E8E',
        },
        error: {
            main: '#bc1f1f',
        },
        background: {
            default: '#ffffff',
        },
    },
});

export default theme;
