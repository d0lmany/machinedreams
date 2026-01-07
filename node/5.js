const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const fibonacci = (limit) => {
    for (let [a, b] = [0, 1]; a <= limit;) {
        console.log(a);
        [a, b] = [b, a + b];
    }
}

readline.question('введите лимит: ', (limit) => {
    const num = parseInt(limit);
    if (isNaN(num)) {
        console.log('но это не число...');
    } else {
        fibonacci(num);
    }
    readline.close();
})