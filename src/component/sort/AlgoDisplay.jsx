import React from 'react';
import styled from "styled-components";
import shallow from "zustand/shallow";

import { useData, useControl } from "../../common/store";
import { sortingAlgorithms } from "../../common/config";
import { SortManager } from "../visualizer/SortManager"; 

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

function TabPanel(props){
    const { children, value, index, ...other } = props;
  
    return(
      <div
        role="tabpanel"
        hidden={value!=index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
        style={{maxWidth:"100%"}}
      >
        {value===index && children}
      </div>
    );
}

export function AlgoDisplay(){
    const resetSorting = useControl((state) => state.resetSorting);

    const [sortingArray, algorithm] = useData(
        (state) => [state.sortingArray, state.algorithm],
        shallow
    );

    React.useEffect(() => {
        resetSorting();
    }, [algorithm]);

    if(sortingArray.length === 0){
        return (
        <h3 style={{display: "flex", justifyContent: "center"}}>
            Please fill in the blank or push the generate button.
        </h3>
        );
    }

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
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
  