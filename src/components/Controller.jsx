import React, { useState } from "react";
import styled from "styled-components";

import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import PauseCircleOutlineOutlinedIcon from '@material-ui/icons/PauseCircleOutlineOutlined';
import ReplayOutlinedIcon from '@material-ui/icons/ReplayOutlined';

import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { delay } from "../common/helper";

import shallow from "zustand/shallow";
import { useControls, useData, useControl } from "../common/store";
import {
  convertInputToArrayString,
  convertArrayStringToArray,
  generateRandomNumberInRange,
  getRandomArray,
  checkInputNumber,
  getArray
} from "../common/helper";

const ControlBar = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  margin: 15px 0;
  flex-wrap: wrap;
`;

const ArrayBar = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 60%;
  flex-grow: 1;
  min-width: 200px;
`;

const ExecutionBar = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 40%;
  flex-grow: 1;
`;

export function SortController() {

  const [isPausing, setIsPausing] = useState(false);

  const [progress, speed] = useControls(
    (state) => [state.progress, state.speed],
    shallow
  );

  const [sortingArray, setSortingArray] = useData(
    (state) => [state.sortingArray, state.setSortingArray],
    shallow
  );

  const [startSorting, pauseSorting, resetSorting, setSpeed] = useControls(
    (state) => [
      state.startSorting,
      state.pauseSorting,
      state.resetSorting,
      state.setSpeed,
    ],
    shallow
  );

  const [arrayInput, setArrayInput] = useState(sortingArray);

  const startElement = <PlayArrowOutlinedIcon onClick={startSorting} />;
  const pauseElement = <PauseCircleOutlineOutlinedIcon onClick={pauseAndDelaySorting} />;
  const resetElement = <ReplayOutlinedIcon onClick={resetSorting}/>;
  const disabledPauseElement = <PauseCircleOutlineOutlinedIcon color="disabled"/>;

  async function pauseAndDelaySorting(){
    pauseSorting();
    setIsPausing(true);
    await delay(useControls.getState().swapTime);
    setIsPausing(false);
  }

  function arrayDataChangeHandler(value) {
    const arrayString = convertInputToArrayString(value);
    setArrayInput(arrayString);

    const array = convertArrayStringToArray(arrayString);
    setSortingArray(array);
    resetSorting();
  }

  function generate() {
    const randomArray = getRandomArray();
    setArrayInput(randomArray);
    setSortingArray(randomArray);
    resetSorting();
  }

  function getProgressButton() {
    if(isPausing)
      return disabledPauseElement;

    switch (progress) {
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

  return (
    <ControlBar>
      <ArrayBar>
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
          onChange={(event) => arrayDataChangeHandler(event.target.value)}
          value={arrayInput}
          size="small"
          width="100px"
          style={{ flexGrow: 1, margin: '0 10px' }}
        />
      </ArrayBar>
      <ExecutionBar>
        <Slider
          key={`slider-${speed}`}
          defaultValue={speed}
          onChange={(event, value) => setSpeed(value)}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={5}
          style={{ flexGrow: 1, flexBasis: "100%" }}
        />
        <div style={{ display: "flex", marginLeft: '20px', columnGap: '5px' }}>
          {getProgressButton()}
          {resetElement}
        </div>
      </ExecutionBar>
    </ControlBar>
  );
}

export function JosephController(){

  const [isPausing, setIsPausing] = useState(false);

  const [numberTotal, setNumberTotal] = useControl(
    (state) => [state.numberTotal, state.setNumberTotal]
  );

  const [speed, setSpeed] = useControl(
    (state) => [state.speed, state.setSpeed]
  );
  
  const [progress] = useControl(
    (state) => [state.progress]
  );
  
  const [josephArray, setJosephArray] = useControl(
    (state) => [state.josephArray, state.setJosephArray]
  );

  const [numberInput, setNumberInput] = useState(numberTotal);

  const [phaseStart, phaseReset, phasePause] = useControl(
    (state) => [state.phaseStart, state.phaseReset, state.phasePause]
  );

  const startElement = <PlayArrowOutlinedIcon onClick={phaseStart}/>;
  const resetElement = <ReplayOutlinedIcon onClick={phaseReset}/>;
  const pauseElement = <PauseCircleOutlineOutlinedIcon onClick={pauseAndDelay}/>;
  const disabledPauseElement = <PauseCircleOutlineOutlinedIcon color="disabled"/>;

  async function pauseAndDelay(){
    phasePause();
    setIsPausing(true);
    await delay(useControl.getState().deQueueTime);
    setIsPausing(false);
  }

  function handleNumberTotal(value){
    const string = checkInputNumber(value);
    setNumberInput(string);
    setNumberTotal(string);

    console.log("input", string);

    const array = getArray(string);
    setJosephArray(array);

    phaseReset();
  }

  function generate(){
    const randomN = generateRandomNumberInRange(1, 99);
    setNumberInput(randomN);
    setNumberTotal(randomN);
    
    const array = getArray(randomN);
    setJosephArray(array);
    phaseReset();
  }

  function getprogressButton(){
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
    <ControlBar>
      <ArrayBar>
        <Button
          variant="contained"
          color="primary"
          onClick={generate}
        >
          Generate
        </Button>
        <TextField
          id="outlined-basic"
          label="n range=[1,99]"
          variant="outlined"
          onChange={(event) => handleNumberTotal(event.target.value)}
          value={numberTotal}
          size="small"
          width="100px"
          style={{ flexGrow: 1, margin: '0 10px' }}
        />
      </ArrayBar>
      <ExecutionBar>
        <Slider
          key={`slider-${speed}`}
          defaultValue={speed}
          onChange={(event, value) => setSpeed(value)}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={5}
          style={{ flexGrow: 1, flexBasis: "100%" }}
        />
        <div style={{ display: "flex", marginLeft: '20px', columnGap: '5px' }}>
          {getprogressButton()}
          {resetElement}
        </div>
      </ExecutionBar>
    </ControlBar>
  );
}