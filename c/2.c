#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 10

char dishList[MAX_SIZE][101] = {""};
int dishCount = 0;

void doAction(int actionNumber) {
    switch (actionNumber) {
        case 1:
        if (dishCount == 0) {
            printf("Меню пусто.\n");
        } else {
            printf("Текущее меню:\n");
            for (int i = 0; i < MAX_SIZE; i++) {
                if (dishList[i][0] != '\0') {
                    printf("%d. %s\n", i + 1, dishList[i]);
                }
            }
        }
        break;
        case 2:
        if (dishCount >= MAX_SIZE) {
            printf("Максимальный размер списка блюд = %i, он превышен.\nУдалите лишнее блюдо, чтобы добавить новое.\n", MAX_SIZE);
        } else {
            printf("Введите название блюда (не более 100 символов): ");
            scanf("%100s", dishList[dishCount]);
            printf("Блюдо добавлено!\n");
            dishCount++;
        }
        break;
        case 3:
        if (dishCount == 0) {
            printf("Меню пусто.\n");
        } else {
            dishCount--;
            printf("Блюдо \"%s\" было удалено.\n", dishList[dishCount]);
            dishList[dishCount][0] = '\0';
        }
        break;
        case 4:
        exit(0);
        break;
        default:
        printf("Неизвестная команда.\n");
    }
}

int main() {
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