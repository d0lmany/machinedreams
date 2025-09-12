#include "models/stringStack.h"
#include <stdio.h>
#include <stdlib.h>

StringStack* dishList;

void doAction(int actionNumber) {
    switch (actionNumber) {
        case 1:
        if (dishList->count == 0) {
            printf("Меню пусто.\n");
        } else {
            printf("Текущее меню:\n");
            for (int i = 0; i < dishList->count; i++) {
                printf("%d. %s\n", i + 1, dishList->list[i]);
            }
        }
        break;
        case 2:
        printf("Введите название блюда: ");
        char newDish[255];
        scanf("%254s", newDish);
        if (push(dishList, newDish) == 1) printf("Блюдо добавлено!\n");
        else printf("Блюдо не добавлено\n");
        break;
        case 3:
        if (dishList->count == 0) {
            printf("Меню пусто.\n");
        } else {
            char* removed = pop(dishList);
            printf("Блюдо \"%s\" было удалено.\n", removed);
            free(removed);
        }
        break;
        case 4:
        destroy(dishList);
        exit(0);
        break;
        default:
        printf("Неизвестная команда.\n");
    }
}

int main() {
    dishList = initStringStack();
    while(1) {
        printf("Добро пожаловать в ресторан!\nЧто хотите сделать?\n");
        printf("1 - Посмотреть меню\n2 - Добавить блюдо\n");
        printf("3 - Убрать последнее блюдо\n4 - Выход\n");
        printf("Выберите действие: ");
        int action;
        if (scanf("%d", &action) != 1) {
            while (getchar() != '\n');
            printf("Этот ввод некорректен. Введите число от 1 до 4.\n");
            continue;
        }
        doAction(action);
    }
}