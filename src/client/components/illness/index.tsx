import React, { FunctionComponent } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { moveNext } from "../actions"
import { Theme, makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { ReducerState } from "../../reducers";
import InfiniteScroll from "react-infinite-scroll-component";
import { getIllnesses } from "../../selectors/illnesses";
import { fetchIllnesses, setIllness } from "../../actions/illnesses";
import { ListItemSecondaryAction, IconButton, Typography } from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
}));
// XXX if initail fetch failed run another fetch in this component using useEffect or check InfiniteScroll if it can suppose inital fetch if list is empty

const Illnesses: FunctionComponent<{ setIllness: (id: number) => void, illnesses: any, moveNext: () => any, fetchIllnesses: ({ page }: { page: number }) => any }> = ({ setIllness, illnesses, moveNext, fetchIllnesses }) => {
    const classes = useStyles();

    const setIllnessAndMoveNext = (illnessId: number) => {
        setIllness(illnessId);
        moveNext();
    }
    return (
        <div className={classes.root}>
            <div id="scrollableDiv" style={{ height: 300, overflow: "auto" }}>
                <InfiniteScroll
                    dataLength={illnesses.illnesses.length}
                    next={() => { fetchIllnesses({ page: ++illnesses.page }); }}
                    hasMore={illnesses.hasNext}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                >
                    <List className={classes.root}>

                        {illnesses.illnesses.map((illness: any) => (
                            <div key={illness.illness.id}>
                                <ListItem>
                                    <ListItemText primary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                {illness.illness.name}
                                            </Typography>
                                        </React.Fragment>
                                    } />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" onClick={() => { setIllnessAndMoveNext(illness.illness.id) }}>
                                            <ArrowForwardIosIcon color="primary" />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </div>
                        ))}
                    </List>

                </InfiniteScroll>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ moveNext, fetchIllnesses, setIllness }, dispatch)
}
const mapStateToProps = (state: ReducerState) => ({
    illnesses: getIllnesses(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Illnesses);