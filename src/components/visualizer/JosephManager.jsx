import React, { useEffect, useRef, useState } from "react";
import ReactDice from 'react-dice-complete';
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import shallow from "zustand/shallow";
import { useControl } from "../../common/store";
import { JosephContainer } from "./JosephContainer";
import { delay } from "../../common/helper";
import 'react-dice-complete/dist/react-dice-complete.css';

let deQueueTime = useControl.getState().deQueueTime;
let countTime = useControl.getState().countTime;

useControl.subscribe(
  (dTime, cTime) => {
    deQueueTime = dTime;
    countTime = cTime;
  },
  (state) => [state.deQueueTime, state.countTime],
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

class Dice extends React.Component {

  render() {
    return (
      <div>
        <ReactDice
          numDice={1}
          rollDone={this.rollDoneCallback}
          defaultRoll={1}
          rollTime={2}
          dotColor={"#ffffff"}
          faceColor={"#1e1e1d"}
          ref={dice => this.reactDice = dice}
          
        />
      </div>
    )
  }

  rollAll() {
    this.reactDice.rollAll()
  }

  rollDoneCallback(num) {
    console.log(`You rolled a ${num}`)
  }
}

export const JosephManager = React.memo(function({
  array,
  josephFunction,
  numberTotal,
}) {
  
  const [highlightIndice, setHighlightIndice] = useState(-1);  
  //遍历数组元素时使方块变色

  const [dequeueIndices, setDequeueIndices] = useState([-1,-1]);
  //出列元素

  const [randomM, setRandomM] = useControl(
    (state) => [state.randomM, state.setRandomM]
  );
  
  const algoArray = useRef([]);
  const queueArray = useRef([]);
  const isAlgoExecutionOver = useRef(false);
  const isComponentUnMounted = useRef(false);
  const progress = useRef("");
  const josephProgressIterator = useRef(null);

  const phaseDone = useControl((state) => state.phaseDone);
  
  async function reset(){
    algoArray.current = [...useControl.getState().josephArray];
    queueArray.current = [];
    setRandomM(0);
    setHighlightIndice(-1);
    setDequeueIndices([-1, -1]);
    isAlgoExecutionOver.current = false;
    josephProgressIterator.current = 
      await josephFunction(algoArray.current,
                            queueArray.current, 
                            random,
                            highlight, 
                            dequeue,
                            splice);
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

  //console.log("processIterator",josephProgressIterator.current);

  async function runAlgo(){

    let completion = { done : false };
    while(!completion?.done 
        && progress.current === "start" 
        && !isComponentUnMounted.current
    ){
      setDequeueIndices([-1, -1]);
      completion = await josephProgressIterator.current?.next();
      console.log("algoArray", algoArray.current);
      console.log("queueArray", queueArray.current);
    }
    if(isComponentUnMounted.current) {
      return;
    }
    if(!isAlgoExecutionOver.current && completion?.done){
      isAlgoExecutionOver.current = true;
      setHighlightIndice(-1);
      setDequeueIndices([-1, -1]);
      phaseDone();
    } 
  }

  async function dequeue(idx, p){
    setDequeueIndices([idx, p]);
    await delay(deQueueTime);
    //console.log("dequeue", idx, "pos", p);
  }

  async function highlight(p){
    await delay(countTime);
  
    setHighlightIndice(p);
    //console.log("highlight", p);
  }

  async function splice(array, idx){
    array.splice(idx, 1);
    await delay(deQueueTime);
  }

  async function random(m){
    setRandomM(m);  
  }

  const arrayContainer = (
    <JosephContainer
      array={algoArray.current}
      id={"algoArray"}
      source={dequeueIndices[0]}
      destination={dequeueIndices[1]}
      highlightIndice={highlightIndice}
    />
  );

  const queueContainer = (
    <JosephContainer
      array={queueArray.current}
      id={"queueArray"}
      source={-1}
      destination={-1}
      highlightIndice={dequeueIndices[1]}
    />
  );

  return(
    <div>
      <Container style={{marginBottom: "50px"}}>
        <HeadBar>
          <strong>n : {numberTotal}</strong>
        </HeadBar>
        <DiceBar>
          <strong>random number : {randomM}</strong>
        </DiceBar>
        {arrayContainer}
      </Container>
      <Container style={{marginTop: "50px"}}>
        <HeadBar><strong>dequeue sequence</strong></HeadBar>
        {queueContainer}
      </Container>
    </div>
  ); 

});