import React, { useEffect } from "react";
import styled from "styled-components";
import shallow from "zustand/shallow";
import { sortingAlgorithms } from "../common/config";
import { useControls, useData, useControl } from "../common/store";
import { SortManager } from "./visualizer/SortManager";
import { JosephManager } from "./visualizer/JosephManager";
import { JosephFunction } from "../Functions/Joseph";

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  column-gap: 10px;
  row-gap: 10px;

  & > div {
    max-width: 100%;
    min-width: 375px;
  }
`;

const flexCenter = { display: "flex", justifyContent: "center" };

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
      style={{ maxWidth: "100%" }}
    >
      {value === index && children}
    </div>
  );
}

export function SortAlgoDisplay() {
  const resetSorting = useControls((state) => state.resetSorting);

  const [sortingArray, algorithm] = useData(
    (state) => [state.sortingArray, state.algorithm],
    shallow
  );

  useEffect(() => {
    resetSorting();
  }, [algorithm]);

  if (sortingArray.length === 0)
    return (
      <h3 style={flexCenter}>
        Please fill in the blank or push the left button!
      </h3>
    );

  return (
    <div style={flexCenter}>
      {sortingAlgorithms.map((algoInfo, idx) => (
        <TabPanel value={algorithm} index={idx} key={algoInfo.name}>
          <SortManager
            array={sortingArray}
            sortFunction={algoInfo.component}
            sortingAlgorithmName={algoInfo.name}
          />
        </TabPanel>
      ))}
      <TabPanel value={algorithm} index={sortingAlgorithms.length}>
        <FlexWrap>
          {sortingAlgorithms.map((algoInfo) => (
            <SortManager
              array={sortingArray}
              sortFunction={algoInfo.component}
              sortingAlgorithmName={algoInfo.name}
              key={algoInfo.name}
            />
          ))}
        </FlexWrap>
      </TabPanel>
    </div>
  );
}

export function JosephAlgoDisplay(){
  const [numberTotal, josephArray, phaseReset] = useControl(
    (state) => [state.numberTotal, state.josephArray, state.phaseReset]);
    
  console.log("n", numberTotal);

  useEffect(() => {
    phaseReset();
  }, [numberTotal]);

  if(numberTotal === NaN){
    console.log("n为null");
    return(
      <h3 style={flexCenter}>
        Please fill in the blank or push the left button!
      </h3>
    );
  }

  return(
    <div style={flexCenter}>
      <TabPanel value={numberTotal} index={numberTotal}>
        <FlexWrap>
          <JosephManager
            array={josephArray}
            josephFunction={JosephFunction}
            numberTotal={numberTotal}
          />
        </FlexWrap>
      </TabPanel>
    </div>
  );
}