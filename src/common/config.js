import { getScreenWidth } from "./helper";
import { BubbleSort } from "../Functions/BubbleSort";
import { SelectionSort } from "../Functions/SelectionSort";
import { InsertionSort } from "../Functions/InsertionSort";
import { QuickSort } from "../Functions/QuickSort";
import { BInsertionSort } from "../Functions/BInsertionSort";
import { ShellSort } from "../Functions/ShellSort";
// colors setting
export const comparisionColor = "pink";
export const swapColor = "yellow";
export const sortedColor = "springgreen";
export const pivotColor = "sandybrown";
export const dequeueColor = "pink";
// time setting
export let swapTime = 1000;
export let compareTime = 500;
export let cycleTime= 1000;
export let deQueueTime = 1000;

// init settings
export let numberTotal = 10;
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
