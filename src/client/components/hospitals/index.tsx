import React, { FunctionComponent, useEffect, useState } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { moveNext } from "../actions"
import { store } from "../../store";

import { ReducerState } from "../../reducers";
import { fetchHospitals, selectHospital } from "../../actions/hospitals";
import { getHospitals } from "../../selectors/hospitals";

import { Theme, makeStyles } from '@material-ui/core/styles';
import { Typography, CircularProgress } from "@material-ui/core";
import { DataGrid, GridColDef, GridRowParams } from '@material-ui/data-grid';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
}));

type Hospitals = {
    hasNext: boolean,
    hospitals: { id: number, name: string, waitingTime: number }[],
    page: number,
    loading: boolean

}
const Hospitals: FunctionComponent<{ selectHospital: (id: number) => void, hospitals: Hospitals, moveNext: () => any, fetchHospitals: ({ page }: { page: number }) => any }> = ({ selectHospital, hospitals, moveNext, fetchHospitals }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);

    // call on even page navigation. enhance by only fetching new data if pain level changes
    // XXX fix dispatch is called twice 
    useEffect(() => {
        store.dispatch(fetchHospitals({ page: 0 }));
    }, []);

    useEffect(() => {
        setLoading(false);
    }, [hospitals.hasNext]);


    const selectHospitalAndMoveNext = (hospitalId: number) => {
        selectHospital(hospitalId);
        moveNext();
    }
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Hospital', width: 200, disableColumnMenu: true, sortable: false, },
        { field: 'waitingTime', headerName: 'Time(m)', width: 100, disableColumnMenu: true, sortable: false, },
    ];


    const move = (param: GridRowParams, event: React.MouseEvent): void => {
        console.warn(param, event);
        moveNext();
    }

    let rows1: { id: number, name: string, waitingTime: number }[] = [{ id: 1, name: "m", waitingTime: 0 }];

    if (loading)
        return (<CircularProgress />)
    else
        return (
            <div className={classes.root}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={hospitals.hospitals} columns={columns} pageSize={5} onRowClick={move} disableColumnMenu={true} disableSelectionOnClick={true} />
                </div>
            </div>
        )
}
const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ moveNext, fetchHospitals, selectHospital }, dispatch)
}
const mapStateToProps = (state: ReducerState) => ({
    hospitals: getHospitals(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Hospitals);