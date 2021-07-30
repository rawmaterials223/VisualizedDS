
/*** Random Number Array ****/ 

function generateRandomNumberInRange(lowerLimit = 0, upperLimit = 99){
    return lowerLimit + Math.floor(Math.random() * upperLimit);
}

export function getRandomArray(length = generateRandomNumberInRange(5,30)){
    return Array.from(new Array(length), () => generateRandomNumberInRange());
}

/*** String to Array ***/

export function inputArrayToString(string){
    string = string.replaceAll(/\s/g, "");
    string = string.replaceAll(/\s\s/g, "");
    string = string.replaceAll(/\d{3}/g, "");
    string = string.replaceAll(/[^0-9,\s]/g, "");
    string = string.replaceAll(/\s,/g, ",");
    string = string.replaceAll(/\，/g, ",");
    string = string.replaceAll(/,,/g, ",");
    return string;
}

export function stringToArray(string){
    return string.split(",").filter((v) => v != "").map((v) => +v);
}

/*** Delay ***/

export function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}