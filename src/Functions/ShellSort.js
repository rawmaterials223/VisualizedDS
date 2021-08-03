export async function* ShellSort(array, swap, highlight, marksort) {
    for (let gap = Math.floor(array.length/2); gap > 0; gap = Math.floor(gap/2)) {
      for(let i = gap; i < array.length; i++){
        let keyIndex = i;
        for(let j = i - gap; j >= 0 ; j = j - gap){
          yield await highlight([j, keyIndex]);
          if(array[j] > array[keyIndex]){
            yield await swap(j, keyIndex);
            keyIndex = j;
          }
          else{
            yield;
            break;
          }
        }
      }
      yield;
    }
}