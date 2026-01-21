const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

enum Mode {
    Encrypt,
    Decrypt,
}

const dictionaries: Record<string, string> = {}
let currentDictionaryCode: string = 'ru';
let mode: Mode = Mode.Encrypt;
let phrase = '';
const commandsDict = {
    'Проверить словари': () => {
        console.log('1 - Вывести словари\n2 - Сменить текущий словарь');
        rl.question('Выберите задачу: ', (input: string) => {
            const task = Number(input);
            if (!isNaN(task)) {
                switch(task) {
                    case 1:
                        console.log(`Текущий словарь: "${currentDictionaryCode}"`);
                        Object.keys(dictionaries).forEach(dictCode => 
                            console.log(`${dictCode}: ${dictionaries[dictCode]}, Размер словаря: ${dictionaries[dictCode].length}`)
                        )
                        break;
                    case 2:
                        console.log(`Текущий словарь: "${currentDictionaryCode}"`);
                        rl.question('Введите код словаря: ', (inp: string) => {
                            const code = inp.trim();
                            if (Object.keys(dictionaries).includes(code)) {
                                currentDictionaryCode = code;
                                console.log(`Текущий словарь изменён на "${code}"`);
                            } else {
                                console.log('Такого словаря нет. Возврат в меню.');
                            }
                        })
                        break;
                    default:
                        console.log('Такой задачи нет. Возврат в меню.')
                }
            }
            ask();
        })
    },
    'Изменить режим обработки фразы': () => {
        console.log(`Текущий режим: ${mode === Mode.Encrypt ? 'Шифрование' : 'Дешифрование'}`);
        console.log('1 - Ничего не делать\n2 - Сменить режим на Шифрование\n3 - Сменить режим на Дешифрование');
        rl.question('Выберите задачу: ', (input: string) => {
            const task = Number(input);
            if (!isNaN(task)) {
                switch(task) {
                    case 1:
                        console.log('Режим не изменён');
                        break;
                    case 2:
                        console.log('Режим изменён на "Шифрование"');
                        mode = Mode.Encrypt;
                        break;
                    case 3:
                        console.log('Режим изменён на "Дешифрование"')
                        mode = Mode.Decrypt;
                        break;
                    default:
                        console.log('Такой задачи нет. Возврат в меню.')
                }
            }
            ask();
        })
    },
    'шифр Цезаря': () => askForPhrase(caesar),
    'шифр Атбаш': () => askForPhrase(atbash),
    'Афинный шифр': () => askForPhrase(athens),
    'Выйти': (): void => rl.close(),
};
const commandNames = Object.keys(commandsDict);

const modInverse = (a: number, m: number): number | null => {
    a = ((a % m) + m) % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) return x;
    }
    return null;
};
const gcb = (a: number, b: number) => {
    if (b === 0) return a;
    else return gcb(b, a % b);
}
const athens = (phrase: string) => rl.question(`Введите ключи a и b через пробел (ключ a должен быть взаимно простым с ${dictionaries[currentDictionaryCode].length}): `, (input: string) => {
    let [a, b]: number[] | string[] = input.trim().split(' ');
    [a, b] = [Number(a), Number(b)];

    console.log(a, b, gcb(a, dictionaries[currentDictionaryCode].length))
    if (!isNaN(a) && !isNaN(b) && gcb(a, dictionaries[currentDictionaryCode].length) === 1) {
        let newPhrase = '';
        const dict = dictionaries[currentDictionaryCode].split('');

        const invA = modInverse(a, dict.length);
        if (invA === null) {
            console.log('Не удалось найти обратный элемент. Возврат в меню.');
            return;
        }

        for (const char of phrase) {
            const idx = dict.indexOf(char);
            if (idx === -1) {
                newPhrase += char;
                continue;
            }

            let newIndex: number;
            if (mode === Mode.Encrypt) {
                newIndex = (a * idx + b) % dict.length;
            } else {
                newIndex = (invA * (idx - b)) % dict.length;
                if (newIndex < 0) newIndex += dict.length;
            }
            
            newPhrase += dict[newIndex];
        }

        console.log(`Новая фраза: "${newPhrase}"`);
    } else {
        console.log('Не хватает ключа или ключи не являются взаимно простыми. Возврат в меню.');
    }
    ask();
})
const atbash = (phrase: string) => {
    let newPhrase = '';
    const dict = dictionaries[currentDictionaryCode].split('');

    for (const char of phrase) {
        const idx = dict.indexOf(char);
        if (idx === -1) {
            newPhrase += char;
            continue;
        }

        const newIndex = dict.length - idx + 1;
        newPhrase += dict[newIndex];
    }

    console.log(`Новая фраза: "${newPhrase}"`);
    ask();
}
const caesar = (phrase: string) => {
    let newPhrase = '';
    const dict = dictionaries[currentDictionaryCode].split('');

    for (const char of phrase) {
        const idx = dict.indexOf(char);
        if (idx === -1) {
            newPhrase += char;
            continue;
        }

        const shift = mode === Mode.Encrypt ? 3 : -3;
        const newIndex = (idx + shift + dict.length) % dict.length;
        newPhrase += dict[newIndex];
    }

    console.log(`Новая фраза: "${newPhrase}"`);
    ask();
}
const askForPhrase = (method: Function): void => rl.question(`Введите фразу для ${mode === Mode.Encrypt ? 'шифрования' : 'дешифрования'}: `, (input: string) => {
    const phrase = input.trim();

    if (phrase) {
        method(phrase);
    } else {
        console.log('Введена пустая фраза. Возврат в меню.');
        ask();
    }
})
const ask = () => {
    commandNames.forEach((name, i) => console.log(`${i} - ${name}`));
    rl.question('Введите число для выполнения задачи: ', (input: string) => {
        const index = Number(input);
        if (!isNaN(index) && index < commandNames.length) {
            const commandName = commandNames[index];
            commandsDict[commandName as keyof typeof commandsDict]();
        } else {
            console.log('Такой команды нет');
            ask();
        }
    })
}
const loadDicts = async () => {
    try {
        const file = Bun.file(__dirname + '/assets/dicts.json');
        return await file.json() as JSON;
    } catch (e) {
        console.log(e instanceof Error ? e.message : 'Не удалось считать словарь');
    }
}
const setDicts = async () => {
    const data = await loadDicts();
    if (data && typeof data === 'object' && !Array.isArray(data)) {
        Object.assign(dictionaries, data);
        console.log('Словарь загружен');
    } else {
        console.log('Не удалось загрузить словарь: неверный формат');
    }
}

const main = async () => {
    console.clear();
    console.log('== Де/Шифрование фраз ==\nЗагружаю словари...');
    await setDicts();
    ask();
}

main();