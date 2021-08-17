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
  id,
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

  if(id === 'algoArray'){
    return(
      <ArrayHolder>
        {array.map((value, i) => {
          if(array.length < 50)
            var radius = 250;
          else if(array.length < 100)
            var radius = 300;
          else
            var radius = 350;
          var angle = ((i - 1)/ (array.length / 2)) * Math.PI;
          var width = (radius * 2) + 50;
          var x = (radius * Math.cos(angle)) + (width / 2) + (400 - radius);
          var y = (radius * Math.sin(angle)) + (width / 2) + (400 - radius);
          if(i === source){
            return(
              <CircleItem
                key={i+":"+value}
                distance={source-destination}
                style={{order : i, 
                  backgroundColor: dequeueColor, 
                  left: x, 
                  top: y}}
              >
                {value}
              </CircleItem>
          );}
          else if(i === highlightIndice){
            return(
              <CircleItem
                key={i+":"+value}
                style={{order : i, 
                  backgroundColor: countColor,
                  left: x,
                  top: y}}
              >
                {value}
              </CircleItem>
          );}
          return(
            <CircleItem
              key={i+":"+value}
              style={{order : i, left:x, top: y}}
            >
              {value}
            </CircleItem>
          );
        })}
      </ArrayHolder>
    );
  }
  else if(id === "queueArray"){
    return(
      <ArrayHolder>
        {array.map((value, i) => {
          if(i === highlightIndice){
            return(
              <ArrayItem
                key={i+":"+value}
                style={{order: i, backgroundColor: dequeueColor}}
              >
                {value}
              </ArrayItem>
            );
          }
          return(
            <ArrayItem
              key={i+":"+value}
              style={{order:i}}
            >
              {value}
            </ArrayItem>
          );
        })}
      </ArrayHolder>
    );
  }
}
