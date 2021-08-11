export async function* JosephFunction(array, queue, m, handleClick, highlight, dequeue,splice){
  let idx = 0;
  let start = 0;
  let cnt = 0;
  //传址，数组原值变动
  while(array.length > 1){
    //暂时让随机数m不变
    console.log("step", cnt);
    console.log("m in func", m);
    //console.log("before arr", arr);
    if(m === 0)
       break;
    for(let i = 0; i < m; i++){
      yield await highlight((start + i) % array.length);
    }
    idx = (start + m - 1) % array.length;
    queue.push(array[idx]);
    //console.log("seq", queue);
    yield await dequeue(idx, cnt);
    yield await splice(array, idx);    //array.splice(idx, 1); 

    start = idx;   
    cnt++;
  }
}