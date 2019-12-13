const mergeSort = (array) => {
	if (array.length < 2) {
		return array;
	}

	let mid = Math.floor(array.length / 2);
	let leftArr = mergeSort(array.slice(0, mid));
	let rightArr = mergeSort(array.slice(mid));
	if (leftArr && rightArr) {
		return merge(leftArr, rightArr);
	}
};

const merge = (leftArr, rightArr) => {
	let i = 0;
	let result = [];
	while (i < leftArr.length && i < rightArr.length) {
		if (leftArr[i] < rightArr[i]) {
			if (leftArr[i]) {
				result.push(leftArr[i]);
				leftArr.shift();
			}
		} else {
			if (rightArr[i]) {
				result.push(rightArr[i]);
				rightArr.shift();
			}
		}
	}

	if (leftArr.length) {
		result = result.concat(leftArr);
	}

	if (rightArr.length) {
		result = result.concat(rightArr);
	}
	return result;
};

const selectionSort = (array) => {
	let length = array.length;
	for (let i = 0; i < length; i++) {
		let lowest = i;
		for (let j = i + 1; j < length; j++) {
			if (array[lowest] > array[j]) {
				lowest = j;
			}
		}
		let temp = array[i];
		array[i] = array[lowest];
		array[lowest] = temp;
	}
	return array;
};

console.log(mergeSort([ 2, 4, 6, 8, 2, 3 ])); //[ 2, 2, 3, 4, 6, 8 ]
console.log(selectionSort([ 2, 4, 6, 8, 2, 3 ])); // [ 2, 2, 3, 4, 6, 8 ];

const groupingByType = (array) => {
	const types = [];
	let obj = {};
	let i = 0;
	let j = 1;
	while (i < array.length) {
		const type = typeof array[i];
		if (!obj[type]) {
			const dataType = [ array[i] ];
			obj[type] = j;
			types.push(dataType);
			j++;
		} else {
			const index = obj[type];
			types[index - 1].push(array[i]);
		}
		i++;
	}
	return types;
};

const sortingByType = (array) => {
	const groupArray = groupingByType(array);
	const result = [];
	for (let i = 0; i < groupArray.length; i++) {
		result.push(selectionSort(groupArray[i]));
	}
	return result;
};

console.log(sortingByType([ 1, 3, 'array', -45, true, false, 'big' ]));
// [ [ -45, 1, 3 ], [ 'array', 'big' ], [ false, true ] ]

const filterArray = (array) => {
	const result = [];
	for (let i = 0; i < array.length; i++) {
		if (
			(Array.isArray(array[i]) && array[i].length) ||
			typeof array[i] === 'boolean' ||
			(!Array.isArray(array[i]) && array[i])
		) {
			result.push(array[i]);
		}
	}
	return result;
};

const sortAllClean = (array) => {
	const filteredArray = filterArray(array);
	if (filteredArray.length === 0) {
		return filteredArray;
	}
	return sortingByType(filteredArray);
};

console.log(sortAllClean([ undefined, null, 456, 'def', NaN, [], true, 123, 'bcd', false ]));
//[ [ 123, 456 ], [ 'bcd', 'def' ], [ false, true ] ]
console.log(sortAllClean([ NaN, undefined ])); // []
