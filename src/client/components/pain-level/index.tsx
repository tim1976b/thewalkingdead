import React, { FunctionComponent } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { moveNext } from "../actions"
import { SetPainLevel } from "../../actions/pain-level"
import { Theme, makeStyles } from '@material-ui/core/styles';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { green, lime, yellow, orange, red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        maxWidth: theme.breakpoints.values.sm / 2, // XXX why?
    },
}));

const PainLevel: FunctionComponent<{ moveNext: () => any, SetPainLevel: (level: number) => any }> = ({ moveNext, SetPainLevel }) => {
    const classes = useStyles();

    const setPainLevelAndMoveNext = (painLevel: number) => {
        SetPainLevel(painLevel);
        moveNext();
    }
    return (
        <div className={classes.root}>
            <IconButton aria-label="Very satisfied" onClick={() => setPainLevelAndMoveNext(0)}  >
                <SentimentVerySatisfiedIcon fontSize="large" style={{ color: green[500] }} />
            </IconButton>
            <IconButton aria-label="Very satisfied" onClick={() => setPainLevelAndMoveNext(1)}>
                <SentimentSatisfiedAltIcon fontSize="large" style={{ color: lime[700] }} />
            </IconButton>
            <IconButton aria-label="Very satisfied" onClick={() => setPainLevelAndMoveNext(2)}>
                <SentimentSatisfiedIcon fontSize="large" style={{ color: yellow[700] }} />
            </IconButton>
            <IconButton aria-label="Very satisfied" onClick={() => setPainLevelAndMoveNext(3)}>
                <SentimentDissatisfiedIcon fontSize="large" style={{ color: orange[500] }} />
            </IconButton>
            <IconButton aria-label="Very satisfied" onClick={() => setPainLevelAndMoveNext(4)}>
                <SentimentVeryDissatisfiedIcon fontSize="large" style={{ color: red[500] }} />
            </IconButton>
        </div>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ moveNext, SetPainLevel }, dispatch)
}

export default connect(null, mapDispatchToProps)(PainLevel);