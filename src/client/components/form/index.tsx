import React, { FunctionComponent, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";


import { ReducerState } from "../../reducers";
import { getFormSubmitted } from "../../selectors/form";

import { store } from "../../store";
import { useFormik, useFormikContext } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { moveBack } from "../actions"
import { SubmitForm } from "../../actions/form";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        paddingTop: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
    },
    textField: {
        paddingTop: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

const validationSchema = yup.object().shape({
    name: yup.string().required(),
    information: yup.string().required(),
})

const Form: FunctionComponent<{ moveBack: () => void, formSubmitted: boolean }> = ({ moveBack, formSubmitted }) => {
    const classes = useStyles();

    const waitFormSubmitted = () => new Promise((resolve) => { while (true) { if (formSubmitted) resolve(true) } }); // XXX what about timeout?

    const formik = useFormik({
        initialValues: {
            name: '',
            information: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            store.dispatch(SubmitForm(values));
            await waitFormSubmitted;
            setSubmitting(false);
        },
    });
    if (formSubmitted) {
        return (
            <Paper square elevation={0} className={classes.resetContainer}>
                <Typography variant="body2">Thank you for submitting your information!</Typography>
            </Paper>
        )

    } else {
        return (
            <div className={classes.root}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Full Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        variant="outlined"
                        className={classes.textField}
                    />

                    <TextField
                        fullWidth
                        id="information"
                        name="information"
                        label="Illness Infomration"
                        type="TextField"
                        multiline
                        rows={4}
                        value={formik.values.information}
                        onChange={formik.handleChange}
                        error={formik.touched.information && Boolean(formik.errors.information)}
                        helperText={formik.touched.information && formik.errors.information}
                        variant="outlined"
                        className={classes.textField}
                    />
                    <div className={classes.root}>
                        <Button color="primary" variant="contained" type="submit" fullWidth >
                            {"Submit"}
                        </Button>
                        <Button variant="contained" className={classes.button} fullWidth onClick={moveBack} >
                            {"Back"}
                        </Button>

                    </div>
                </form>
            </div >
        );
    }
};

const mapStateToProps = (state: ReducerState) => ({
    formSubmitted: getFormSubmitted(state)
})
const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ moveBack }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
