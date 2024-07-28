// Функция для проверки длины строки

function countStringLength (string, length) {
  return string.length <= length;
}

countStringLength('проверяемая строка', 10);


//Функция для проверки, является ли строка палиндромом

function checkPalindrome (string) {
  const normalString = string.replaceAll(' ', '').toLowerCase();

  let reverseString = '';

  for (let i = normalString.length - 1; i >= 0; i--) {
    reverseString += normalString[i];
  }

  return reverseString === normalString;
}

checkPalindrome('Лёша на полке клопа    нашёл ');


//Функция принимает строку, извлекает содержащиеся в ней цифры и возвращает их в виде целого положительного числа

function getNumber (string) {
  string = String(string).replaceAll(' ', '');

  let result = '';

  for (let i = 0; i < string.length; i++) {
    if (!isNaN(string[i])) {
      result += string[i];
    }
  }

  return result ? Number(result) : NaN;
}

getNumber();
