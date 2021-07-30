import React from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import { delay } from "../../common/helper";
import shallow from "zustand/shallow";
import { useControl, useData } from "../../common/store";
import { ArrayContainer } from "./ArrayContainer";

let compareTime = useControl.getState().compareTime;
let swapTime = useControl.getState().swapTime;

const Container = styled(Card)`
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
`;

const AlgoHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20px;
`;

useControl.subscribe(
   ([cTime, sTime]) => {
    compareTime = cTime;
    swapTime = sTime;
   },
    (state) => [state.compareTime, state.swapTime],
    shallow
);

export const SortManager = React.memo(function({
  array,
  sortFunction,
  sortingAlgorithmName,
}){
    const [swapIndice, setSwapIndice] = React.useState([-1, -1]);
    const [highlightedIndice, setHighlightedIndice] = React.useState([-1, -1]);

    const algoArray = React.useRef([]);
    const sortedIndice = React.useRef([]);
    const pivot = React.useRef(-1);
    const swapCount = React.useRef(0);
    const comparisonCount = React.useRef(0);
    const isAlgoExecutionOver = React.useRef(false);
    const isComponentUnMouted = React.useRef(false);

    const markSortingDone = useControl((state) => state.markSortingDone);
    const progress = React.useRef("");
    const sortProgressIterator = React.useRef(null);

    async function reset(){
        algoArray.current = [...useData.getState().sortingArray];
        sortedIndice.current = [];
        pivot.current = -1;
        swapCount.current = 0;
        comparisonCount.current = 0;
        isAlgoExecutionOver.current = false;

        setSwapIndice([-1, -1]);
        setHighlightedIndice([-1, -1]);

        sortProgressIterator.current = await sortFunction(algoArray.current, swap, highlight, markSort);

    }

    React.useEffect(() => {
        progress.current = useControl.getState().progress;
        useControl.subscribe(
            (value) => {
                progress.current = value;
                if(progress.current === "start") runAlgo();
                if(progress.current === "reset") reset();
            },
            (state) => state.progress,
        );

        return () => {
          isComponentUnMouted.current = true;
        };
    },[]);

    React.useEffect(() => {
        reset();
    }, [array]);

    async function runAlgo(){
        let completion = { done: false };
        while(
            !completion?.done && 
            progress.current === "start" &&
            !isComponentUnMouted.current
        ){
            completion = await sortProgressIterator.current?.next();
        }

        if(isComponentUnMouted.current){
            return;
        }

        if(!isAlgoExecutionOver.current && completion?.done){
            isAlgoExecutionOver.current = true;
            pivot.current = -1;
            setSwapIndice([-1, -1]);
            setHighlightedIndice([-1, -1]);
            markSortingDone();
        }
    }

    async function swap(i, j){
        let temp = algoArray.current[i];
        algoArray.current[i] = algoArray.current[j];
        algoArray.current[j] = temp;
        setSwapIndice([i, j]);
        pivot.current = -1;
        swapCount.current += 1;
        await delay(swapTime);
    }

    async function highlight(indices, p){
        setSwapIndice([-1, -1]);
        comparisonCount.current += 1;
        pivot.current = p;
        setHighlightedIndice(indices);
        await delay(compareTime);
    }

    function markSort(...indices){
        sortedIndice.current.push(...indices);
    }

    return(
      <Container>
        <AlgoHeaderBar>
            <strong>{sortingAlgorithmName}</strong>
        </AlgoHeaderBar>
        <ArrayContainer 
          array={algoArray.current}
          source={swapIndice[0]}
          destination={swapIndice[1]}
          pivot={pivot.current}
          highlightIndice={highlightedIndice}
          sortedIndice={sortedIndice.current}
        />
      </Container>
    );
}

);