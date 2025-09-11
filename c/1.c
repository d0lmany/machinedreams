#include <stdio.h>

int main() {
    int rad;
    printf("Введите температуру на улице: ");
    scanf("%d", &rad);
    if (rad < 0) {
        printf("Холодно! Одевайся потеплее!\n");
    } else {
        if (rad > 20) {
            printf("На улице тепло, можно надеть футболку.\n");
        } else {
            printf("Прохладно, лучше взять куртку.\n");
        }
    }
}
