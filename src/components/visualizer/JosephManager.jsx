import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Popover from '@material-ui/core/Popover';
import Card from "@material-ui/core/Card";
import shallow from "zustand/shallow";
import { useControl } from "../../common/store";
import { JosephContainer } from "./JosephContainer";
import { getRandomNumber } from "../../common/helper";

let deQueueTime = useControl.getState().deQueueTime;

useControl.subscribe(
  (dTime) => {
    deQueueTime = dTime;
  },
  (state) => state.deQueueTime,
  shallow
);

const Container = styled(Card)`
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
`;

const HeadBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20px;
`;

const DiceBar = styled.div`
  display:flex;
  justify-content: space-between;
  aligh-items: center;
  
`;

export const JosephManager = React.memo(function({
  array,
  josephFunction,
  numberTotal,
}) {
  
  const [highlightIndice, setHighlightIndice] = useState(-1);  
  //遍历数组元素时使方块变色

  const [dequeueIndices, setDequeueIndices] = useState([-1,-1]);
  //出列元素

  const [randomM, setRandomM] = useState(0); 
  const algoArray = useRef([]);
  const isAlgoExecutionOver = useRef(false);
  const isComponentUnMounted = useRef(false);
  const progress = useRef("");
  const josephProgressIterator = useRef(null);

  const phaseDone = useControl((state) => state.phaseDone);
  
  async function reset(){
    algoArray.current = [...useControl.getState().josephArray];
    setRandomM(0);
    setHighlightIndice(-1);
    setDequeueIndices([-1, -1]);
    isAlgoExecutionOver.current = false;
    josephProgressIterator.current = 
      await josephFunction(algoArray.current, randomM.current, highlight, dequeue);
  }
  //randomM.current需要商榷
  async function runAlgo(){
    let completion = { done : false };
    while(!completion?.done 
        && progress.current === "start" 
        && !isComponentUnMounted.current
    ){
        completion = await josephProgressIterator.current?.next();
    }
    if(isComponentUnMounted.current) {
      return;
    }
    if(!isAlgoExecutionOver.current && completion?.done){
      isAlgoExecutionOver.current = true;
      setRandomM(0);
      setHighlightIndice(-1);
      setDequeueIndices([-1, -1]);
      phaseDone();
    }
  }

  useEffect(() => {
    progress.current = useControl.getState().progress;
    useControl.subscribe(
      (value) => {
        progress.current = value;
        if(progress.current === "start") runAlgo();
        if(progress.current === "reset") reset();
      },
      (state) => state.progress,
    )

    return () => {
      isComponentUnMounted.current = true;
    };
  }, []);

  useEffect(() => {
    reset();
  }, [array]);

  async function dequeue(idx, p){
    setDequeueIndices([idx, p]);
    await dealy(deQueueTime);
  }

  async function highlight(p){
    setHighlightIndice(p);
    await delay(deQueueTime);
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    var num = getRandomNumber(1, 6);
    setRandomM(num);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return(
    <Container>
      <HeadBar>
        <strong>n : {numberTotal}</strong>
      </HeadBar>
      <DiceBar>
        <Button 
          aria-describedby={id} 
          variant="contained" 
          color="primary" 
          onClick={handleClick}
        > 
          DICE
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{vertical: 'bottom', horizontal: 'center',}}
          transformOrigin={{vertical: 'top', horizontal: 'center',}}
        >
          {randomM}
        </Popover>
      </DiceBar>
      <JosephContainer
        array={array}
        source={dequeueIndices[0]}
        destination={dequeueIndices[1]}
        highlightIndice={highlightIndice}
      />
    </Container>

  ); 

});