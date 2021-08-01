import React from "react";
import styled, { keyframes } from "styled-components";
import { useControl } from "../../common/store";
import {
    comparisonColor,
    swapColor,
    sortedColor,
    pivotColor,
} from "../../common/config";

let swapTime = useControl.getState().swapTime;
useControl.subscribe(
    (time) => (swapTime = time),
    (state) => state.swapTime
);

const ArrayHolder = styled.div`
  display: flex;
  height: 175px;
  align-items: center;
  padding: 15px;
  overflow: auto;
`;

const ArrayItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 50px;
  height: 50px;
  box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  flex-shrink: 0;
`;

const destinationAnimation = (distance, swapColor) => keyframes`
  0%{
    background-color: ${swapColor};
  }
  40%{
    transform: translate(0px, 0px);
    background-color: ${swapColor};
  }
  60% {
    transform: translate(0px, 50px);
    background-color: ${swapColor};
  }
  80% {
    transform: translate(-${distance * 50}px, 50px);
    background-color: ${swapColor};
  }
  99% {
    transform: translate(-${distance * 50}px, 0px);
    background-color: ${swapColor};
  }
  100%{
    transform: translate(-${distance * 50}px, 0px);
    background-color: none;
  }
`;

const sourceAnimation = (distance, swapColor) => keyframes`
  0%{
    background-color: ${swapColor};
  }
  40%{
    transform: translate(0px, 0px);
    background-color: ${swapColor};
  }
  60% {
    transform: translate(0px, -50px);
    background-color: ${swapColor};
  }
  80% {
    transform: translate(${distance * 50}px, -50px);
    background-color: ${swapColor};
  }
  99% {
    transform: translate(${distance * 50}px, 0px);
    background-color: ${swapColor};
  }
  100%{
    transform: translate(${distance * 50}px, 0px);
    background-color: none;
  }
`;

const Source = styled(ArrayItem)`
  animation: ${(props) => destinationAnimation(props.distance, swapColor)}
    ${() => swapTime / 1000}s forwards;
`;

const Destination = styled(ArrayItem)`
  animation: ${(props) => sourceAnimation(props.distance, swapColor)}
    ${() => swapTime / 1000}s forwards;
`;

export function ArrayContainer({
  array,
  source,
  destination,
  pivot = -1,
  highlightIndices,
  sortedIndices,
}){
  function getBackgroundColor(i) {
    if (i === pivot) {
      return pivotColor;
    }

    if (highlightIndices.includes(i)) {
      return comparisonColor;
    }

    if (sortedIndices.includes(i)) {
      return sortedColor;
    }
    return "";
  }

  return (
    <ArrayHolder>
        {array.map((value, i) => {
            if(i === source){
                return (
                    <Source
                       key={i + ":" + source + ":" + destination + ":" + value}
                       distance={destination - source}
                       style={{
                           order:destination,
                           backgroundColor: swapColor,
                       }}
                    >
                       {value}
                    </Source>
                );
            }
            if(i === destination){
                return(
                    <Destination
                       key={i + ":" + destination + ":" + source + ":" + value}
                       distance={destination - source}
                       styled={{
                           order: source,
                           backgroundColor: swapColor,
                       }}
                    >
                       {value}
                    </Destination>
                );
            }
            return(
                <ArrayItem
                   key={i + ":" + destination + ":" + source + ":" + value}
                   styled={{
                       order: i,
                       backgroundColor: swapColor,
                   }}
                >
                   {value}
                </ArrayItem>
            );
        })}
    </ArrayHolder>
  );
};