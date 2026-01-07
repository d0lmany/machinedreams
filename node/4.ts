const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// fucking Zed don't get me chance to write the code 😭
// TODO: rewrite self-state

const toDecimal = (number: string, base: number) => {
  let decimal = 0;
  for (let i = 0; i < number.length - 1; i++) {
    decimal += parseInt(number[i]) * Math.pow(base, number.length - i - 1);
  }
  return decimal;
}

const toBase = (number: number, base: number) => {
  let result = '';
  while (number > 0) {
    result = (number % base).toString() + result;
    number = Math.floor(number / base);
  }
  return result;
}

const main = async () => {
  const action = await new Promise<string>((resolve) => {
    readline.question('Enter an action (toDecimal/toBase): ', resolve);
  });

  if (action === 'toDecimal') {
    const number = await new Promise<string>((resolve) => {
      readline.question('Enter a number: ', resolve);
    });

    const base = await new Promise<number>((resolve) => {
      readline.question('Enter the base: ', resolve);
    });

    const decimal = toDecimal(number, base);
    console.log(`The decimal representation of ${number} in base ${base} is ${decimal}`);
  } else if (action === 'toBase') {
    const number = await new Promise<number>((resolve) => {
      readline.question('Enter a number: ', resolve);
    });

    const base = await new Promise<number>((resolve) => {
      readline.question('Enter the base: ', resolve);
    });

    const baseRepresentation = toBase(number, base);
    console.log(`The base ${base} representation of ${number} is ${baseRepresentation}`);
  }

  await main();
};

main();