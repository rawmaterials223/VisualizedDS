import create from 'zustand';
import { devtools } from "zustand/middleware";
import { sortingArray, swapTime, compareTime, sortingAlgorithms } from "./config";

export const useData = create(
  devtools(set => ({
    algorithm : 0,
    sortingArray : sortingArray,

    setSortingArray : (array) => set({ sortingArray : array }),
    setAlgorithm : (idx) => set({ algorithm : idx })
  }))
);

export const useControl = create(
  devtools(set => ({
    progress: "reset",
    speed: 2,
    swapTime: swapTime,
    compareTime: compareTime,
    doneCount: 0,

    startSorting : () => set({progress : "start"}),
    pauseSorting : () => set({progress : "pause"}),
    resetSorting : () => set({progress : "reset"}),
    markSortingDone : () => set((state) => {
      if(useData.getState().algorithm === sortingAlgorithms.length){
        if(state.doneCount === sortingAlgorithms.length - 1){
          return {doneCount: 0, progress: "done"};
        }
        else{
          return {doneCount: state.doneCount + 1};
        }
      }
      else{
        return {progress: "done"};
      }
    }),
    setSpeed : (speed) => set(() => { return { swapTime: 3000 / speed, compareTime: 1500 / speed, speed }; }),
  }))
);