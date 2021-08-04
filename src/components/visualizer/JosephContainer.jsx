import React from "react";
import styled from "styled-components";
import { deQueueColor } from "../../common/config";
import { useControl } from "../../common/store";

let deQueueTime = useControl.getState().deQueueTime;
useControl.subscribe(
  (time) => {deQueueTime = time;},
  (state) => state.deQueueTime
);

export function JosephContainer({

}) {
    
}
