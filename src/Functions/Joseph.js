export async function* JosephFunction(array, m, highlight, dequeue){
  let idx = 0;
  let start = 0;
  while(array.length > 1){
    idx = (start + m - 1) % array.length;
    array.splice(idx, 1);
    start = idx + 1;
  }
}