export function convertInputToArrayString(string) {
  string = string.replaceAll(/\s/g, "");
  string = string.replaceAll(/\d{3}/g, "");
  string = string.replaceAll(/\s\s/g, " ");
  string = string.replaceAll(/\s,/g, ",");
  string = string.replaceAll(/,,/g, ",");
  string = string.replaceAll(/[^0-9,\s]/g, "");
  return string;
}

export function convertArrayStringToArray(string) {
  return string
    .split(",")
    .filter((v) => v !== "")
    .map((v) => +v);
}

export function checkInputNumber(string){
  string = string.replaceAll(/[^0-9]/g,"");
  string = string.replaceAll(/\d{3}/g, "");
  return string;
}

export function getRandomArray(length = generateRandomNumberInRange(5, 30)) {
  return Array.from(new Array(length), () => generateRandomNumberInRange());
}

export function getScreenWidth(){
  return window.innerWidth;
}

export function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function generateRandomNumberInRange(lowerLimit = 0, upperLimit = 99) {
  //Math.floor(Math.random()*upperLimit) -> [0, upperLimit - 1]
  return lowerLimit + Math.floor(Math.random() * upperLimit);
}

export function getArray(num){
  var array = new Array(num);
  for(let i = 0; i < num; i++)
    array[i] = i + 1;
  return array;
}