dishList = [];

def doAction(actionNumber):
    if actionNumber == 1:
        print('Текущее меню:');
        for dish in dishList:
            print(dish);
    elif actionNumber == 2:
        dishList.append(input('Введите название блюда: '));
        print('Блюдо добавлено!');
    elif actionNumber == 3:
        print(f'Блюдо "{dishList.pop()}" было удалено.');
    elif actionNumber == 4:
        exit(0);

def main():
    print('Добро пожаловать в ресторан!');
    print('Что хотите сделать?');
    print('1 - Посмотреть меню');
    print('2 - Добавить блюдо');
    print('3 - Убрать последнее блюдо');
    print('4 - Выход');
    doAction(int(input('Выберите действие: ')));

while True:
    main();