import React, { FunctionComponent } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
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

import PainLevel from "./pain-level";
import Illness from "./illness";
import Hospitals from "./hospitals";
import Form from "./form";

import { getPageData } from "./selectors";
import { ReducerState } from "../reducers";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        alignItems: "center",
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
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


const App: FunctionComponent<{ pageData: number, moveNext: () => any, moveBack: () => any, reset: () => any }> = ({ pageData, moveNext, moveBack, reset }) => {
    const classes = useStyles();

    return (
        <>
            <AppBar position="static" className={classes.root}>
                <Typography variant="subtitle2" >
                    The Walking Dead
                </Typography>
            </AppBar>
            <Stepper activeStep={pageData} orientation="vertical" >
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
                    </Step>
                ))}
            </Stepper>
            {pageData === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>Thank you for submitting your infomration!</Typography>
                    <Button onClick={reset} className={classes.button}>
                        Start again
                        {/* // XXX do we need that  */}
                    </Button>
                </Paper>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

