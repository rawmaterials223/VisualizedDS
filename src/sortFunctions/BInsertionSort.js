export async function* BInsertionSort(array, swap, highlight, marksort) {
    for (let i = 0; i < array.length; i++) {
      var low = 0;
      var high = i - 1;
      while(low <= high){
        var middle = Math.floor((low + high) / 2);
        yield await highlight([i, middle]);
        if(array[middle]>array[i]){
            high = middle - 1;
        } 
        else{
            low = middle + 1;
        }
      }
      for(var j = i - 1; j >= low; j--){
          yield await swap(j, j + 1);
      }
  
      marksort(i);
      yield;
    }
}