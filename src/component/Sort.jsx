import React from 'react';
import styled from "styled-components";

import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TextField from "@material-ui/core/TextField"
import Button from '@material-ui/core/Button';

import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import PauseCircleOutlineOutlinedIcon from '@material-ui/icons/PauseCircleOutlineOutlined';
import ReplayOutlinedIcon from '@material-ui/icons/ReplayOutlined';

import shallow from "zustand/shallow";

import { useData, useControl } from "../common/store";
import { sortingAlgorithms } from "../common/config";
import { getRandomArray, inputArrayToString, stringToArray, delay } from "../common/helper";
import { SortManager } from './visualizer/SortManager'; 

import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  navbar: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  }
}));

const Container = styled.div`
  margin: 0 10px;
  position: relative;
  margin-bottom: 50px;
  min-height: calc(100vh - 50px);
`;

const ControllerBar = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  margin: 15px 0;
  flex-wrap: wrap;
`;

const Bar1 = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 60%;
  flex-grow: 1;
  min-width: 300px;
`;

const Bar2 = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 40%;
  flex-grow: 1;
`;

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  column-gap: 10px;
  row-gap: 10px;

  & > div {
    max-width: 100%;
    min-width: 375px;
  }
`;



function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

function NavBar(){
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
            onChange={(event, id) => setAlgorithm(id)}
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

function Controller(){
  
  const [sortingArray, setSortingArray] = useData(
    (state) => [state.sortingArray, state.setSortingArray],
    shallow
  );

  const [arrayInput, setArrayInput] = React.useState(sortingArray);
  
  const handleArrayInput = (event) => {
    const arrayString = inputArrayToString(event.target.value);
    setArrayInput(arrayString);

    const array = stringToArray(arrayString);
    setSortingArray(array);
    resetSorting();
  };

  function generate(){
    const randomArray = getRandomArray();
    setArrayInput(randomArray);
    setSortingArray(randomArray);
    resetSorting();
  }

  const [startSorting, pauseSorting, resetSorting, setSpeed] = useControl(
    (state) => [
      state.startSorting,
      state.pauseSorting,
      state.resetSorting,
      state.setSpeed,
    ],
    shallow
  );

  const [isPausing, setIsPausing] = React.useState(false);
  const [progress, speed] = useControl(
    (state) =>  [state.progress, state.speed],
    shallow
  )
  
  const startElement = <PlayArrowOutlinedIcon onClick={startSorting}/>;
  const pauseElement = <PauseCircleOutlineOutlinedIcon onClick={pauseAndDelaySorting}/>;
  const resetElement = <ReplayOutlinedIcon onClick={resetSorting}/>;
  const disabledPauseElement = <PauseCircleOutlineOutlinedIcon color="disabled"/>;

  async function pauseAndDelaySorting(){
    pauseSorting();
    setIsPausing(true);
    await delay(useControl.getState().swapTime);
    setIsPausing(false);
  }

  function getButton(){
    if(isPausing)
      return disabledPauseElement;
    
    switch(progress){
      case "reset":
        return startElement;
      case "start":
        return pauseElement;
      case "pause":
        return startElement;
      case "done":
        return disabledPauseElement;
    }
  }

  return(
  <ControllerBar>
    <Bar1>
      <Button
        variant="contained"
        color="primary"
        onClick={generate}
      >
        Generate
      </Button>
      <TextField
        id="outlined-basic"
        label="Input"
        variant="outlined"
        onChange={handleArrayInput}
        value={arrayInput}
        size="small"
        width="50px"
        style={{ flexGrow: 1, margin: '0 10px'}}
      />
    </Bar1>
    <Bar2>
      <div style={{ display: "flex", marginLeft: '20px', columnGap: '5px' }}>
        {getButton()}
        {resetElement}
      </div>      
    </Bar2>
  </ControllerBar>
  );
}

function TabPanel(props){
  const { children, value, index, ...other } = props;

  return(
    <div
      role="tabpanel"
      hidden={value!=index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
      style={{maxWidth:"100%"}}
    >
      {value===index && children}
    </div>
  );
}

function AlgoDisplay(){
  const resetSorting = useControl((state) => state.resetSorting);

  const [sortingArray, algorithm] = useData(
    (state) => [state.sortingArray, state.algorithm],
    shallow
  );
  
  React.useEffect(() => {
    resetSorting();
  }, [algorithm]);

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      {sortingAlgorithms.map((algoInfo, idx) => (
        <TabPanel value={algorithm} index={idx} key={algoInfo.name}>
          <SortManager
            array={sortingArray}
            sortFunction={algoInfo.component}
            sortingAlgorithmName={algoInfo.name}
          />
        </TabPanel>
      ))}
      <TabPanel value={algorithm} index={sortingAlgorithms.length}>
        <FlexWrap>
          {sortingAlgorithms.map((algoInfo) => (
            <SortManager
              array={sortingArray}
              sortFunction={algoInfo.component}
              sortingAlgorithmName={algoInfo.name}
              key={algoInfo.name}
            />
          ))}
        </FlexWrap>
      </TabPanel>
    </div>
  );
}

export default function Sort(){

  return(
    <Container>
      <NavBar/>
      <Controller/>
      <AlgoDisplay/>
    </Container>
);}