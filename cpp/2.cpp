#include <iostream>
#include <string>
#include <vector>

std::vector<std::string> dishList;

using std::cin;

void println(std::string msg) {
    std::cout << msg << '\n';
}

void doAction(int actionNumber) {
    switch (actionNumber) {
        case 1:
            if (dishList.size() == 0) {
                println("Меню пусто.");
            } else {
                println("Текущее меню:");
                for (int i = 0; i < dishList.size(); i++) {
                    std::cout << i + 1 << ". " << dishList[i] << "\n";
                }
            }
            break;
        case 2: {
            println("Введите название блюда:");
            std::string newDish;
            std::cin.ignore();
            std::getline(std::cin, newDish);
            dishList.push_back(newDish);
            std::cout << "Блюдо \"" << dishList.back() << "\" добавлено!";
            break;
        }
        case 3:
            if (dishList.size() == 0) {
                println("Меню пусто.");
            } else {
                std::cout << "Блюдо \"" << dishList.back() << "\" удалено!";
                dishList.pop_back();
            }
            break;
        case 4:
            exit(0);
            break;
        default:
            println("Неизвестная команда.");
            break;
    }
}

int main() {
    while(1) {
        println("Добро пожаловать в ресторан!\nЧто хотите сделать?");
        println("1 - Посмотреть меню\n2 - Добавить блюдо");
        println("3 - Убрать последнее блюдо\n4 - Выход");
        std::cout << "Выберите действие: ";
        int action;

        cin >> action;
        doAction(action);
    }
}