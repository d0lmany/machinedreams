from models import MPF;

mpfList = [];

def ask():
    inAsset = int(input('Введите вводной актив (ОПФ вв): '));
    outAsset = int(input('Введите выводной актив (ОПФ вы): '));
    date = input('Введите дату ввода/вывода в виде "ДД-ММ": ');
    mpfList.append(MPF(inAsset, outAsset, date));

def getTotal(mpfInitial):
    inTotal = 0;
    outTotal = 0;
    for mpf in mpfList:
        inTotal += mpf.getAmountIn();
        outTotal += mpf.getAmountOut();
    return mpfInitial + (inTotal / 12 - outTotal / 12);

def main():
    if len(mpfList) != 0:
        print('Текущие ОПФ:');
        for mpf in mpfList:
            print(f'{mpfList.index(mpf) + 1}. {mpf.toString()}');
    act = int(input('Что требуется сделать?\n1 - Добавить актив\n2 - Рассчитать стоимость\n3 - Выйти\n'));
    if act == 1:
        ask();
    elif act == 2:
        total = getTotal(int(input('Введите ОПФ к началу года (нг): ')));
        print(f'\033[1;36mСреднегодовая СОПФ: {round(total)}.\033[0m');
    elif act == 3:
        exit(0);
    else:
        print('Такой команды нет.');

print('== Расчёт среднегодовой СОПФ ==');
while True:
    main();