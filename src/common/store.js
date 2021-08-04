import create from "zustand";
import { devtools } from "zustand/middleware";
import {
  sortingArray,
  compareTime,
  swapTime,
  sortingAlgorithms,
  cycleTime,
  deQueueTime,
  numberTotal
} from "./config";

export const useControls = create(
  devtools((set) => ({
    progress: "reset",
    speed: 3,
    compareTime: compareTime,
    swapTime: swapTime,
    doneCount: 0,

    startSorting: () => set({ progress: "start" }),
    pauseSorting: () => set({ progress: "pause" }),
    resetSorting: () => set({ progress: "reset", doneCount: 0 }),
    markSortngDone: () =>
      set((state) => {
        if (useData.getState().algorithm === sortingAlgorithms.length) {
          if (state.doneCount === sortingAlgorithms.length - 1)
            return { doneCount: 0, progress: "done" };
          else return { doneCount: state.doneCount + 1 };
        } else return { progress: "done" };
      }),
    setSpeed: (speed) =>
      set(() => {
        return { swapTime: 3000 / speed, compareTime: 1500 / speed, speed };
      }),
  }))
);

export const useData = create(
  devtools((set) => ({
    algorithm: 0,
    sortingArray: sortingArray,

    setSortingArray: (array) => set({ sortingArray: array }),
    setAlgorithm: (idx) => set({ algorithm: idx }),
  }))
);

export const useControl= create(
  devtools((set) => ({
    progress: "reset",
    speed: 3,
    cycleTime: cycleTime,
    numberTotal: numberTotal,
    randomM: 1,
    swapTime : swapTime,
    deQueueTime : deQueueTime,
    josephArray: [],

    setJosephArray: (array) => set({ josephArray: array }),
    setSpeed: (speed) =>
      set(() => {
        return { swapTime: 3000 / speed, compareTime: 1500 / speed, speed };
      }),
    phaseStart : () => set({ progress : "start" }),
    phaseReset : () => set({ progress : "reset" }),
    phasePause : () => set({ progress : "pause"}),
    phaseDone : () => set({ progress : "done" }),
    setNumberTotal : (n) => set({ numberTotal : n }),
    setRandomM : (m) => set({ randomM : m }),
  }))
);
