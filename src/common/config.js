import { BubbleSort, InsertionSort, QuickSort, SelectionSort } from "../component/SortAlgorithm";

export const sortingAlgorithms = [
    { component : InsertionSort, title: "Straight", name: "Straight InsertionSort" },
    { component : InsertionSort, title: "Binary", name: "Binary InsertionSort" },    
    { component : InsertionSort, title: "Shell", name: "ShellSort" },   
    { component : BubbleSort, title: "Bubble", name: "BubbleSort"},
    { component : QuickSort, title: "Quick", name: "QuickSort" },
    { component : SelectionSort, title: "Selection", name: "SelectionSort" },
];

export let sortingArray = initArray();

function initArray(){
    return [5,4,3,2,1];
};

export const swapTime = 1000;
export const compareTime = 500;

export const comparisonColor = "pink";
export const swapColor = "yellow";
export const sortedColor = "green";
export const pivotColor = "red";