import React, { FunctionComponent } from 'react';
import { connect } from "react-redux";
import { bindActionCreators, compose } from 'redux'
import { moveNext, moveBack, reset } from "./actions";

import { Theme, makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

import PainLevel from "./pain-level";
import Illness from "./illness";
import Hospitals from "./hospitals";
import Form from "./form";

import { getPageData } from "./selectors";
import { ReducerState } from "../reducers";
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        alignItems: "center",
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    paper: {
        display: "flex",
        padding: 24,
        alignItems: "center",
        justifyContent: "center"

    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const steps = [
    { label: 'Please select your pain level', component: <PainLevel /> },
    { label: 'Select an Illness', component: <Illness />, },
    { label: 'Select a Hospitals', component: <Hospitals />, },
    { label: 'Submit Your Information', component: <Form />, },
];



const App: FunctionComponent<{ width: Breakpoint, pageData: number, moveNext: () => any, moveBack: () => any, reset: () => any }> = ({ width, pageData, moveNext, moveBack, reset }) => {
    const classes = useStyles();

    const BackButton = ({ index }: { index: number }) => (
        <Button
            variant="contained"
            disabled={index === 0}
            onClick={moveBack}
            className={classes.button}
        >
            Back
        </Button>
    )

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {"The Walking Dead"}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>

            <Stepper activeStep={pageData} orientation={isWidthDown('xs', width) ? "vertical" : "horizontal"} >
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel >
                            {step.label}
                        </StepLabel>
                        {isWidthDown('xs', width) && (
                            <StepContent>
                                {step.component}
                                <div>
                                    {(index > 0 && index !== (steps.length - 1)) && (
                                        <BackButton index={index} />
                                    )}
                                </div>
                            </StepContent>
                        )}
                    </Step>
                ))}
            </Stepper>

            {!isWidthDown('xs', width) && (
                <><Divider variant="middle" />

                    <Paper className={classes.paper} elevation={0}>

                        {steps[pageData].component}


                    </Paper>
                    <Paper className={classes.paper} elevation={0}>

                        {(pageData > 0 && pageData !== (steps.length - 1)) && (
                            <BackButton index={pageData} />
                        )}

                    </Paper>

                </>
            )}

        </>
    );
}

const mapStateToProps = (state: ReducerState) => ({
    pageData: getPageData(state)
})

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ moveNext, moveBack, reset }, dispatch)
}

export default compose<FunctionComponent>(
    withWidth(),
    connect(mapStateToProps, mapDispatchToProps)
)(App);

