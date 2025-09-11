const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
readline.question('Введите температуру на улице: ', (i) => {
    const rad = parseInt(i);
    if (rad < 0) {
        console.log('Холодно! Одевайся потеплее!');
    } else {
        if (rad > 20) {
            console.log('На улице тепло, можно надеть футболку.');
        } else {
            console.log('Прохладно, лучше взять куртку.');
        }
    }
    readline.close();
})