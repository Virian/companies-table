const partition = (array, prop, left, right, direction = 'asc') => {
  const newArray = array.slice();
  const pivot = newArray[Math.floor((right + left) / 2)][prop]; // middle element
  let i = left; // left pointer
  let j = right; // right pointer
  while (i <= j) {
    if (direction === 'asc') {
      while (newArray[i][prop] < pivot) {
        i += 1;
      }
      while (newArray[j][prop] > pivot) {
        j -= 1;
      }
    } else {
      while (newArray[i][prop] > pivot) {
        i += 1;
      }
      while (newArray[j][prop] < pivot) {
        j -= 1;
      }
    }
    if (i <= j) {
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // swapping two elements
      i += 1;
      j -= 1;
    }
  }
  return [i, newArray];
};

const quickSortBy = (array, prop, left, right, direction = 'asc') => {
  let newArray;
  let index;
  if (array.length > 1) {
    [index, newArray] = partition(array, prop, left, right, direction); // index from partition
    if (left < index - 1) { // more elements on the left side of the pivot
      newArray = quickSortBy(newArray, prop, left, index - 1, direction);
    }
    if (index < right) { // more elements on the right side of the pivot
      newArray = quickSortBy(newArray, prop, index, right, direction);
    }
  }
  return newArray;
};

export default (array, prop, direction = 'asc') => quickSortBy(array, prop, 0, array.length - 1, direction);
