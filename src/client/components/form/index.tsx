import React, { FunctionComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { store } from "../../store";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { moveBack } from "../actions"
import { SubmitForm } from "../../actions/form";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        paddingTop: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
    },
    textField: {
        paddingTop: theme.spacing(2),
    }
}));

const validationSchema = yup.object().shape({
    name: yup.string().required(),
    infomration: yup.string().required(),
})

const Form: FunctionComponent<{ moveBack: () => void }> = ({ moveBack }) => {
    const classes = useStyles();

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms)); // XXX delete me 

    const formik = useFormik({
        initialValues: {
            name: '',
            infomration: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            store.dispatch(SubmitForm(values));
            await sleep(500);
            alert(JSON.stringify(values, null, 2));
        },
    });

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
                    id="infomration"
                    name="infomration"
                    label="Illness Infomration"
                    type="TextField"
                    multiline
                    rows={4}
                    value={formik.values.infomration}
                    onChange={formik.handleChange}
                    error={formik.touched.infomration && Boolean(formik.errors.infomration)}
                    helperText={formik.touched.infomration && formik.errors.infomration}
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
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ moveBack }, dispatch)
}

export default connect(null, mapDispatchToProps)(Form);
