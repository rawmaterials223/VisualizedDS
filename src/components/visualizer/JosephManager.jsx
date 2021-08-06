import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import shallow from "zustand/shallow";
import { useControl } from "../../common/store";
import { JosephContainer } from "./JosephContainer";

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

export const JosephManager = React.memo(function({
  array,
  josephFunction,
  numberTotal,
}) {
  
  const [dequeueIndices, setDequeueIndices] = useState([-1,-1]);
  const deQueue = useRef(-1); //出列元素--deQueue.current，其下一个元素为报数元素。
  const algoArray = useRef([]);
  const isAlgoExecutionOver = useRef(false);
  const isComponentUnMounted = useRef(false);
  const progress = useRef("");
  const josephProgressIterator = useRef(null);

  const phaseDone = useControl((state) => state.phaseDone);
  
  async function reset(){
    algoArray.current = [...useControl.getState().josephArray];
    deQueue.current = -1;
    setDequeueIndices([-1, -1]);
    isAlgoExecutionOver.current = false;
    josephProgressIterator.current = 
      await josephFunction(algoArray.current, highlight, dequeue);
  }

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
      deQueue.current = -1;
      isAlgoExecutionOver.current = true;
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

  async function dequeue(i, j){
    //i---josephArray.index
    //j---queueArray.index
    setDequeueIndices([i, j]);
  }

  async function highlight(p){
    deQueue.current = p;
    await delay(deQueueTime);
  }

  return(
    <Container>
      <HeadBar>
        <strong>n : {numberTotal}</strong>
      </HeadBar>
      <JosephContainer
        array={array}
        source={dequeueIndices[0]}
        destination={dequeueIndices[1]}
      />
    </Container>

  ); 

});