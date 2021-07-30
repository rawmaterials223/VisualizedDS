import { BubbleSort } from "../component/SortAlgorithm";

export const sortingAlgorithms = [
    { title: "Straight", name: "Straight InsertionSort" },
    { title: "Binary", name: "Binary InsertionSort" },    
    { title: "Shell", name: "ShellSort" },   
    { component : BubbleSort, title: "Bubble", name: "BubbleSort"},
    { title: "Quick", name: "QuickSort" },
    { title: "Selection", name: "SelectionSort" },
];

export const sortingArray = initArray();

function initArray(){
    return [5,4,3,2,1];
};

export const swapTime = 1000;
export const compareTime = 500;

export const comparisonColor = "pink";
export const swapColor = "yellow";
export const sortedColor = "green";
export const pivotColor = "red";