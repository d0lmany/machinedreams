use std::io;

fn main() {
    println!("Введите температуру на улице: ");

    let mut input = String::new();
    io::stdin()
        .read_line(&mut input)
        .expect("Ошибка чтения ввода");
    let rad: i32 = input
        .trim()
        .parse()
        .expect("Введено не число");
    if rad < 0 {
        println!("Холодно! Одевайся потеплее!");
    } else if rad > 20 {
        println!("На улице тепло, можно надеть футболку.");
    } else {
        println!("Прохладно, лучше взять куртку.");
    }
}