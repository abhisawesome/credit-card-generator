
const generateValidCard = (bin, length) => {
  var cardNumber = generate(bin, length),
    luhnValid = luhnCheck(cardNumber),
    limit = 20,
    counter = 0;

  while (!luhnValid) {
    cardNumber = generate(bin, length);
    luhnValid = luhnCheck(cardNumber);
    counter++;

    if (counter === limit) {
      cardNumber = (luhnValid) ? cardNumber : 'invalid params'
      break;
    }
  }

  return cardNumber;
}

const generate = (bin, length) => {
  var cardNumber = bin,
    randomNumberLength = length - (bin.length + 1);

  for (var i = 0; i < randomNumberLength; i++) {
    var digit = Math.floor((Math.random() * 9) + 0);
    cardNumber += digit;
  }

  var checkDigit = getCheckDigit(cardNumber);

  cardNumber += String(checkDigit);

  return cardNumber;
}

const getCheckDigit = (number) => {
  var sum = 0,
    module,
    checkDigit;

  for (var i = 0; i < number.length; i++) {

    var digit = parseInt(number.substring(i, (i + 1)));

    if ((i % 2) == 0) {
      digit = digit * 2;
      if (digit > 9) {
        digit = (digit / 10) + (digit % 10);
      }
    }
    sum += digit;
  }

  module = parseInt(sum) % 10;
  checkDigit = ((module === 0) ? 0 : 10 - module);

  return checkDigit;
}

const luhnCheck = (function (weights) {
  return function (creditCardNumber) {
    var length = creditCardNumber.length,
      isEven = true,
      sum = 0,
      digit;

    while (length) {
      digit = parseInt(creditCardNumber.charAt(--length), 10);
      sum += (isEven = !isEven) ? weights[digit] : digit;
    }

    return sum && sum % 10 === 0;
  };
}([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));



const generateCardNumber = (prefix, length, count = 1) => {
  const cardNumbers = [];

  for (let i = 0; i < count; i++) {
    const cardNumber = generateValidCard(prefix, length);
    cardNumbers.push(cardNumber);
  }

  return cardNumbers;
}
const verifyCardNumber = (creditCardNumber) => {
  // Remove non-digit characters from the credit card number
  const cleanedNumber = creditCardNumber.replace(/\D/g, '');

  // Check if the cleaned number is a valid credit card number using Luhn algorithm
  const isLuhnValid = luhnCheck(cleanedNumber);

  return isLuhnValid;
};


export {
  generateCardNumber,
  verifyCardNumber
}