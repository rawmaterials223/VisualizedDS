import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { dequeueColor, countColor } from "../../common/config";
import { useControl } from "../../common/store";

let deQueueTime = useControl.getState().deQueueTime;
useControl.subscribe(
  (time) => {deQueueTime = time;},
  (state) => state.deQueueTime
);

import {
  ArrayHolder,
  ArrayItem,
  dequeueAnimation,
  moveAnimation
} from "../../common/styles";

const AnimatedItem = styled(ArrayItem)`
  animation: ${(props) => dequeueAnimation(props.distance, dequeueColor)}
  ${() => deQueueTime / 1000}s forwards;
`;

const MovedItem = styled(ArrayItem)`
  animation: ${moveAnimation()} ${() => deQueueTime / 1000}s forwards;
`;

export function JosephContainer({
  josepharray,
  queuearray,
  source,
  destination,
  highlightIndice,
}) {

  console.log("src", source, "dest", destination);
  console.log("queue", queuearray);

  function getBackgroundColor(){
    if(josepharray.includes(highlightIndice))
      return countColor;
    if(josepharray.includes(source))
      return dequeueColor;
    return "";
  }

  return(
    <div>
      <ArrayHolder style={{height: "275px"}}>
        {josepharray.map((value, i) => {
          if(i === source){
            return(
              <AnimatedItem
                key={i+":"+value}
                distance={source-destination}
                style={{order : i, backgroundColor: getBackgroundColor()}}
              >
                {value}
              </AnimatedItem>
            );
          }
          else if(i === highlightIndice){
            return(
              <ArrayItem
                key={i+":"+value}
                style={{order : i, backgroundColor: countColor}}
              >
                {value}
              </ArrayItem>
            );
          }
          return(
            <ArrayItem
              key={i+":"+value}
              style={{order : i}}
            >
              {value}
              </ArrayItem>
            );
            
        })}

      </ArrayHolder>
      <ArrayHolder>
        {queuearray.map((value, i) => {
          <ArrayItem
            key={i+":"+value}
            style={{order : i}}
          >
            {value}
          </ArrayItem>
        })}        
      </ArrayHolder>
    </div>
  );
}
