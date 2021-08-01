import React from 'react';
import styled from "styled-components";
import shallow from "zustand/shallow";

import TextField from "@material-ui/core/TextField"
import Button from '@material-ui/core/Button';

import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import PauseCircleOutlineOutlinedIcon from '@material-ui/icons/PauseCircleOutlineOutlined';
import ReplayOutlinedIcon from '@material-ui/icons/ReplayOutlined';

import { useData, useControl } from '../../common/store';
import { getRandomArray, inputArrayToString, stringToArray, delay } from "../../common/helper";

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


export function Controller(){
  
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
  