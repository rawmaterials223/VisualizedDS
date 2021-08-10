import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { dequeueColor } from "../../common/config";
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
  array,
  source,
  destination,
  highlightIndice,
}) {

  const [items, setItems] = useState([...array]);

  /*
    useEffect(() => {
    if (source !== -1 && destination !== -1) {
      generateItems(setItems, source, destination);
    }
  }, [source, destination]);
  */
  useEffect(() => {
    setItems([...array]);
  }, [array]);

  function getBackgroundColor(i){
    if(highlightIndice.includes(i))
      return dequeueColor;
    return "";
  }

  return(
    <div>
    <ArrayHolder style={{height: "275px"}}>
      {items.map((value, i) => {
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

    </div>
  );
}
