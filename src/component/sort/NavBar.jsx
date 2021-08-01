import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useData } from '../../common/store';
import { sortingAlgorithms } from "../../common/config";
import shallow from "zustand/shallow";

const useStyles = makeStyles((theme) => ({
    navbar: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    }
}));

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
}

export function NavBar(){
    const classes = useStyles();

    const [algorithm, setAlgorithm] = useData(
        (state) => [state.algorithm, state.setAlgorithm],
        shallow
    );

    return(
        <div className={classes.navbar}>
            <div>
                <AppBar position="static" color="default">
                    <Tabs
                        value={algorithm}
                        onChange={(id) => setAlgorithm(id)}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        {sortingAlgorithms.map((algorithm) => (
                        <Tab
                            label={algorithm.title}
                            {...a11yProps(0)}
                            key={algorithm.title}
                        />
                        ))}
                        <Tab label="All" {...a11yProps(6)} />
                    </Tabs>
                </AppBar>
            </div>
        </div>
    );
}
