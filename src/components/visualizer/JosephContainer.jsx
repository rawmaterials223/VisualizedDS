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
  CircleItem,
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
  array,
  source,
  destination,
  highlightIndice,
}) {

  const [items, setItems] = useState(array);

  const generateItem = (setItems, source, destination) => {
    setItems((items) => {
      const newItems = [...items];

     for(let i = source; i < destination; i++){
       newItems[i] = newItems[i+1];
     }

     return newItems;
    })
  }

  useEffect(() => {
    if(source != -1)
      generateItem(setItems, source, items.length-1);
  }, [source])

  useEffect(() => {
    setItems(array);
  }, [array]);

  function getBackgroundColor(){
    if(array.includes(highlightIndice))
      return countColor;
    if(array.includes(source))
      return dequeueColor;
    return "";
  }

  return(
    <ArrayHolder>
      {array.map((value, i) => {
        if(i === source){
          return(
            <CircleItem
              key={i+":"+value}
              distance={source-destination}
              style={{order : i, backgroundColor: getBackgroundColor()}}
            >
              <div style={{textAlign: "center"}}>{value}</div>
            </CircleItem>
        );}
        else if(i === highlightIndice){
          return(
            <CircleItem
              key={i+":"+value}
              style={{order : i, backgroundColor: countColor}}
            >
              {value}
            </CircleItem>
        );}
        return(
          <CircleItem
            key={i+":"+value}
            style={{order : i}}
          >
            {value}
          </CircleItem>
        );
      })}
    </ArrayHolder>
  );
}
