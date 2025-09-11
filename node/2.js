const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
// vars
const hello = [
    "Добро пожаловать в ресторан!",
    "Что хотите сделать?",
    "1 - Посмотреть меню",
    "2 - Добавить блюдо",
    "3 - Убрать последнее блюдо",
    "4 - Выход"
].join('\n');
const dishList = [];
// logic
const showMenu = () => {
    console.log('\n' + hello + '\n');
}
// funcs
const doAction = (actionNumber) => {
    try {
        actionNumber = parseInt(actionNumber);
        switch (actionNumber) {
            case 1:
                if (dishList.length === 0) {
                    console.log('Меню пусто.');
                } else {
                    console.log('\nТекущее меню:');
                    dishList.forEach((dish, index) => {
                        console.log(`${index + 1}. ${dish}`);
                    });
                }
                askForAction();
                break;
            case 2:
                readline.question('Введите название блюда: ', i => {
                    dishList.push(i);
                    console.log(`Блюдо "${i}" добавлено!\n`);
                    console.log('Блюдо добавлено!');
                    askForAction();
                });
                break;
            case 3:
                if (dishList.length === 0) {
                    console.log('Меню пусто.');
                } else {
                    console.log(`Блюдо "${dishList.pop()}" было удалено.`);
                }
                askForAction();
                break;
            case 4:
                readline.close();
                process.exit(0);
            default:
                console.log('Неизвестная команда.');
                askForAction();
        }
    } catch (e) {
        console.error('Этот ввод некорректен. Введите число от 1 до 4.\n' + e);
        askForAction();
    }
}
const askForAction = () => {
    showMenu();
    readline.question('Выберите действие: ', doAction);
}
console.log('=== Ресторан 1.0 ===');
askForAction();