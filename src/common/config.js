import { getScreenWidth } from "./helper";
import { BubbleSort } from "../sortFunctions/BubbleSort";
import { SelectionSort } from "../sortFunctions/SelectionSort";
import { InsertionSort } from "../sortFunctions/InsertionSort";
import { QuickSort } from "../sortFunctions/QuickSort";
import { HeapSort } from "../sortFunctions/HeapSort.js";
import { MergeSort } from "../sortFunctions/MergeSort";
import { BInsertionSort } from "../sortFunctions/BInsertionSort";
import { ShellSort } from "../sortFunctions/ShellSort";
// colors setting
export const comparisionColor = "pink";
export const swapColor = "yellow";
export const sortedColor = "springgreen";
export const pivotColor = "sandybrown";

// time setting
export let swapTime = 1000;
export let compareTime = 500;

// init array
export let sortingArray = initArrayForScreenSize();

export const sortingAlgorithms = [
  { component: InsertionSort, title: "Straight Insertion", name: "InsertionSort" },
  { component: BInsertionSort, title: "Binary Insertion", name: "BInsertionSort" },
  { component: ShellSort, title: "Shell", name: "ShellSort" },
  { component: BubbleSort, title: "Bubble", name: "BubbleSort" },
  { component: QuickSort, title: "Quick", name: "QuickSort" },
  { component: SelectionSort, title: "Selection", name: "SelectionSort" },
];

function initArrayForScreenSize() {
  const screenSize = getScreenWidth();
  if (screenSize < 460) return [4, 3, 2, 1];
  else if (screenSize < 720) return [8, 7, 6, 5, 4, 3, 2, 1];
  return [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
}
