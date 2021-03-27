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
        padding: 24,
        alignItems: "center",
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

const steps = [
    { label: 'Please select your pain level', component: <PainLevel /> },
    { label: 'Select an Illness', component: <Illness />, },
    { label: 'Suggested Hospitals', component: <Hospitals />, },
    { label: 'Submit Your Infomration', component: <Form />, },
];


const App: FunctionComponent<{ width: Breakpoint, pageData: number, moveNext: () => any, moveBack: () => any, reset: () => any }> = ({ width, pageData, moveNext, moveBack, reset }) => {
    const classes = useStyles();

    return (
        <>
            <AppBar position="static" className={classes.root}>
                <Typography variant="subtitle2" >
                    The Walking Dead
                </Typography>
            </AppBar>
            <Stepper activeStep={pageData} orientation={isWidthDown('xs', width) ? "vertical" : "horizontal"} >
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                        // optional={
                        //     index === 2 ? (
                        //         <Typography variant="caption">Last step</Typography>
                        //     ) : null
                        // }
                        >
                            {step.label}
                        </StepLabel>
                        {isWidthDown('xs', width) && (
                            <StepContent>
                                {step.component}
                                <div>
                                    {/* <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                    </Button> */}
                                    {index > 0 && (<Button
                                        variant="contained"
                                        disabled={index === 0}
                                        onClick={moveBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    )}
                                </div>
                            </StepContent>
                        )}
                    </Step>
                ))}
            </Stepper>

            {!isWidthDown('xs', width) && (
                <Paper className={classes.paper} elevation={0}>
                    {steps[pageData].component}
                    < div >
                        {/* <Button
                        variant="contained"
                        onClick={moveNext}
                        className={classes.button}
                    >
                        {pageData === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button> */}
                        {pageData > 0 && (<Button
                            variant="contained"
                            disabled={pageData === 0}
                            onClick={moveBack}
                            className={classes.button}
                        >
                            Back
                        </Button>
                        )}
                    </div>
                </Paper>
            )}

            {
                pageData === steps.length && (
                    <Paper square elevation={0} className={classes.resetContainer}>
                        <Typography>Thank you for submitting your infomration!</Typography>
                        <Button onClick={reset} className={classes.button}>
                            Start agains
                        {/* // XXX do we need that  */}
                        </Button>
                    </Paper>
                )
            }
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

