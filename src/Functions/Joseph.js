export async function* JosephFunction(array, m, handleClick, highlight, dequeue){
  let idx = 0;
  let start = 0;
  let cnt = 0;
  while(array.length > 1){
    //暂时让随机数m不变
    console.log("m in func", m);
    //console.log("before array", array);
    if(m === 0)
       break;
    for(let i = 0; i < m; i++){
      yield await highlight((start + i) % array.length);
    }
    idx = (start + m - 1) % array.length;
    yield await dequeue(idx, cnt);
    array.splice(idx, 1);
    start = idx;   
    console.log("after array", array);
    cnt++;
  }
}