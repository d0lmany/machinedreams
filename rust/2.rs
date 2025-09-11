use std::{io, process::exit};

fn main() {
    let mut dish_list: Vec<String> = Vec::new();
    loop {
        println!("Добро пожаловать в ресторан!\nЧто хотите сделать?");
        println!("1 - Посмотреть меню\n2 - Добавить блюдо");
        println!("3 - Убрать последнее блюдо\n4 - Выход");
        print!("Выберите действие: ");
        let mut input = String::new();
        io::stdin()
            .read_line(&mut input)
            .expect("Ошибка ввода");
        let action: i32 = input
            .trim()
            .parse()
            .expect("Введите число!");
        do_action(action, &mut dish_list);
    }
}

fn do_action(action_number: i32, list: &mut Vec<String>) {
    match action_number {
        1 => {
            if list.is_empty() {
                println!("Меню пусто.");
            } else {
                println!("Текущее меню:");
                for (index, dish) in list.iter().enumerate() {
                    println!("{}. {}", index + 1, dish)
                }
            }
        }
        2 => {
            println!("Введите название блюда: ");
            let mut input = String::new();
            io::stdin()
                .read_line(&mut input)
                .expect("Ошибка при получении имени");
            let new_dish = input.trim().to_string();
            list.push(new_dish);
            println!("Блюдо \"{}\" добавлено!", list.last().unwrap())
        }
        3 => {
            if list.is_empty() {
                println!("Меню пусто.");
            } else {
                println!("Блюдо \"{}\" удалено!", list.last().unwrap());
                list.pop();
            }
        }
        4 => {
            exit(0);
        }
        _ => {
            println!("Неизвестная команда.");
        }
    }
}