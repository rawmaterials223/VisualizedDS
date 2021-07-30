export async function* BubbleSort(array, swap, highlight, marksort) {
    for (let i = 0; i < array.length; i++) {
      for (var j = 0; j < array.length - i - 1; j++) {
        yield await highlight([j, j + 1]);
  
        if (array[j] > array[j + 1]) {
          yield await swap(j, j + 1);
        }
      }
  
      marksort(j);
      yield;
    }
}

export async function* InsertionSort(array, swap, highlight, marksort) {
    for (let i = 0; i < array.length; i++) {
        let keyIndex = i;
        for (var j = i - 1; j >= 0; j--) {
            yield await highlight([keyIndex, j]);

            if (array[j] > array[keyIndex]) {
                yield await swap(j, keyIndex);
                keyIndex = j;
            } else {
                yield;
                break;
            }
        }

        marksort(i);
        yield;
    }
}

export async function* QuickSort(
    array,
    swap,
    highlight,
    markSort,
    low = 0,
    high = array.length - 1
  ) {
  
    if (low <= high) {
      let pivot = yield* await partition(array, low, high);
      yield* await QuickSort(array, swap, highlight, markSort, low, pivot - 1);
      yield* await QuickSort(array, swap, highlight, markSort, pivot + 1, high);
    }
  
    async function* partition(array, low, high) {
      let pivot = low;
      let i = low;
      let j = high + 1;
  
      while (i < j) {
  
        while (--j > low) {
          yield await highlight([i, j], pivot);
          if (array[j] < array[pivot]) {
            break;
          }
        }
  
        while (i <= high && i < j) {
          yield await highlight([i], pivot);
          if (array[++i] > array[pivot]) {
            break;
          }
        }
  
        if (i < j) {
          yield await swap(i, j);
        }
      }
  
      if (pivot !== j) {
        yield await swap(pivot, j);
      }
  
      markSort(j);
      yield;
      return j;
    }
}

export async function* SelectionSort(array, swap, highlight, marksort) {
    for (let i = 0; i < array.length; i++) {
      let maxIndex = 0;
      for (var j = 0; j < array.length - i; j++) {
        yield await highlight([maxIndex, j]);
  
        if (array[maxIndex] < array[j]) {
          maxIndex = j;
        }
      }
  
      j = j - 1;
      if (maxIndex !== j && array[maxIndex] !== array[j]) {
        yield await swap(maxIndex, j);
      }
  
      marksort(j);
      yield;
    }
}
  