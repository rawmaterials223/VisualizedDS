export async function* JosephFunction(array, m, highlight, dequeue){
  let idx = 0;
  let start = 0;
  let cnt = 0;
  console.log("idx", idx);
  while(array.length > 1){
    yield await m;
    console.log("m in func", m);
    for(let i = 0; i < m; i++){
      yield await highlight((start + i) % array.length);
    }
    idx = (start + m - 1) % array.length;
    yield await dequeue([idx, cnt]);
    array.splice(idx, 1);
    start = idx + 1;
    cnt++;
  }
}