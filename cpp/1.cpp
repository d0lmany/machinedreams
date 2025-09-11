#include <iostream>

int main() {
    int rad;
    std::cout << "Введите температуру на улице: ";
    std::cin >> rad;

    if (rad < 0) {
        std::cout << "Холодно! Одевайся потеплее!\n";
    } else {
        if (rad > 20) {
            std::cout << "На улице тепло, можно надеть футболку.\n";
        } else {
            std::cout << "Прохладно, лучше взять куртку.\n";
        }
    }
}