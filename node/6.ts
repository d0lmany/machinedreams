// @ts-ignore
const readline = require('readline').createInterface({
// @ts-ignore
    input: process.stdin,
// @ts-ignore
    output: process.stdout
});

const arr = [1, 2, 3, 4, 5, 6];

const findIndexMax = (array: number[]) => {
    switch (array.length) {
        case 0:
            return -1;
        case 1:
            return 0;
        default:
            let maxNumber = array[0], maxIndex = -1;
            for (let i = 0; i < array.length; i++) {
                if (array[i] > maxNumber) {
                    maxNumber = array[i];
                    maxIndex = i;
                }
            }
            return maxIndex;
    }
}

arr.splice(findIndexMax(arr), 1);
console.log(arr[findIndexMax(arr)]);
readline.close();