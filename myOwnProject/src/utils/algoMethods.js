export const randomNumBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const makeFirstLetterCapital = (string) => {
  const term = string.toLowerCase().trim();
  return term.charAt(0).toUpperCase() + term.slice(1);
};

export const generateUniqNumber = (array, key) => {
  const random = randomNumBetween(1_000_000, 9_999_999);
  const item = array.find((item) => item[key] === random);
  if (!item) return random;
  return generateUniqNumber(array, key);
};

//#region заметки
//* в первую очередь мы деллаем все буквы маленькими, а потом делаем первую большой "hello world" => "Hello world"
//* trim() - удаляет пробелы в начале и в конце строки "   hello world   " => "hello world"
//* chatAt(0) - возвращает первый символ строки "hello world" => "h"
//* slice(1) - возвращает строку начиная с первого символа "hello world" => "ello world"  "hello world".slice(1) => "ello world"
//*charAt(0).toUpperCase() - делает первую букву большой "hello world" => "Hello world"
// rg = /([A-Za-z ])*/g; - регулярное выражение, которое ищет все буквы и пробелы в строке "#$@ hello %$%world 123#$@$"  => "hello world"
//#endregion
