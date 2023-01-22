import initialData from "../initialData/initialData.js";
import {
  randomNumBetween,
  makeFirstLetterCapital,
  generateUniqNumber,
} from "../utils/algoMethods.js";

class User {
  //* здесь мы создаем переменные, которые будут доступны только внутри класса User и будут доступны только через методы класса User (getters, setters, methods)
  //#region props
  #id;
  #name;
  address = {
    state: ``,
    country: ``,
    city: ``,
    street: ``,
    houseNumber: ``,
    zip: ``,
  };
  #phone;
  #email;
  #password;
  #createdAt;
  #isAdmin;
  #isBusiness;
  //#endregion

  //* здесь в конструкторе мы принимаем объект user и массив users, если он есть, и деструктурируем его, чтобы получить все свойства объекта user, которые мы хотим присвоить свойствам класса User

  //#region constructor
  constructor(user, users = []) {
    const {
      name: { first, last },
      address: { state, country, city, street, houseNumber, zip },
      phone,
      email,
      password,
      isAdmin = false,
      isBusiness = false,
    } = user; //* деструктурируем объект user, чтобы получить все свойства объекта user, которые мы хотим присвоить свойствам класса User

    this.#id = generateUniqNumber(users, "_id");
    this.#name = this.setName(first, last);
    this.address = { state, country, city, street, houseNumber, zip };
    this.#phone = this.checkPhone(phone);
    this.#email = this.checkEmail(email, users);
    this.#password = this.checkPassword(password);
    this.#createdAt = new Date();
    this.#isAdmin = isAdmin;
    this.#isBusiness = isBusiness;
  } // end constructor

  //#region methods
  // generateId(users) {
  //   const random = randomNumBetween(1_000_000, 9_999_999);
  //   const user = users.find((user) => user._id === random);
  //   if (!user) return (this.#id = random);
  //   this.generateId(users);
  // } //* the method is replaced by generateUniqNumber поскольку он более универсальный и может генерировать уникальные числа для любого свойства объекта класса User (в данном случае для свойства _id) и не только для свойства _id объекта класса User (в данном случае для свойства _id)

  setName(first, last) {
    const rg = /([^A-Za-z ])*/g;
    const leanFirstName = first.replace(rg, "");
    const leanLastName = last.replace(rg, "");
    const firstName = makeFirstLetterCapital(leanFirstName);
    const lastName = makeFirstLetterCapital(leanLastName);
    return `${firstName} ${lastName}`;
  }

  checkPhone(phone) {
    const rg =
      /^(((\+972)(\-|\s?))|0)[0-9]{1,2}(\-|\s?)[0-9]{3}(\-|\s?)[0-9]{4}/g; //+972-5x-xxx-xxxx or 05x-xxx-xxxx
    if (phone.match(rg) !== null) return phone;
    throw new Error("The phone should be valid: +05x-xxx-xx-xx");
  }
  checkEmail(email, users = []) {
    const rg = /^.+@.+\..{2,}$/g;
    if (email.match(rg) === null) throw new Error("The email should be valid");
    const user = users.find((user) => user.email === email);
    if (!user) return email;
    throw new Error("The email is already in use");
  }
  checkPassword(password) {
    const rg =
      /(?=.*\d{1})(?=.*\d{1})(?=.*\d{1})(?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20}/g;
    if (password.match(rg) !== null) return password;
    throw new Error(
      "The password must contain at least 1 uppercase letter in English, 1 lowerсase letter in English, 4 numbers and 1 of the following character: !@#$%^&*-"
    );
  }

  changeBusinessStatus(user) {
    if (!user.isAdmin) return null;
    this.#isBusiness = !this.#isBusiness;
  }
  //#endregion

  //#region getters
  get _id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get phone() {
    return this.#phone;
  }
  get email() {
    return this.#email;
  }
  get password() {
    return this.#password;
  }
  get createdAt() {
    return this.#createdAt;
  }
  get isAdmin() {
    return this.#isAdmin;
  }
  get isBusiness() {
    return this.#isBusiness;
  }
  //#endregion

  //#region setters
  set _id(id) {
    return (this.#id = id);
  }
  set name({ first, last }) {
    //set name(value) {
    //const { first, last } = value; // деструктуризация объекта value в переменные first и last
    return (this.#name = this.setName(first, last));
  }

  set phone(value) {
    return (this.#phone = this.checkPhone(value));
  }
  set email({ email, users }) {
    return (this.#email = this.checkEmail(email, users));
  }
  set password(password) {
    return (this.#password = this.checkPassword(password));
  }
  set isBusiness(value) {
    this.#isBusiness = value;
  }

  //#endregion
}

export default User;

//#region Regex
// javascript regex - https://regex101.com/ - online regex tester
//javascript regex Cheat Sheet - https://www.debuggex.com/cheatsheet/regex/javascript
//checkPassword(password) {
// const rg =
// /(?=.*\d{1})(?=.*\d{1})(?=.*\d{1})(?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20}/g;
// .* - любое количество любых символов
// \d - любая цифра
// \D - любой символ, кроме цифры
// \w - любая буква, цифра или подчеркивание
// \W - любой символ, кроме буквы, цифры или подчеркивания
// \s - любой пробельный символ
// \S - любой символ, кроме пробельного
// \b - граница слова
// \B - не граница слова
// ^ - начало строки
// $ - конец строки
// {n} - n раз
// {n,} - n раз и более
// {n,m} - от n до m раз
// ? - 0 или 1 раз
// + - 1 и более раз
// * - 0 и более раз
// | - или
// () - группа
// [] - диапазон
// [^] - не входит в диапазон
// \ - экранирование спецсимвола
// . - любой символ, кроме перевода строки
// \d{1} - любая цифра
// [A-Z]{1} - любая заглавная буква
// [a-z]{1} - любая строчная буква
// [!@#$%^&*-]{1} - любой из этих символов
// .{7,20} - любой символ от 7 до 20 раз

// email
// throw new Error("The email is already in use"); // показывает ошибку красным цветом в форме, если email уже занят другим пользователем
// checkPhone(phone) {
//   const rg =
//     /^(((\+972)(\-|\s?))|0)[0-9]{1,2}(\-|\s?)[0-9]{3}(\-|\s?)[0-9]{4}/g; //+972-5x-xxx-xxxx or 05x-xxx-xxxx
//   if (phone.match(rg) !== null) return phone; //эта строка проверяет, что введенный телефон соответствует регулярному выражению и возвращает его в качестве результата функции checkPhone (т.е. возвращает телефон, если он валидный)  !== null - если телефон не соответствует регулярному выражению, то возвращается null и выполняется throw new Error("The phone should be valid: +05x-xxx-xx-xx");

//   throw new Error("The phone should be valid: +05x-xxx-xx-xx");
// }
//#endregion
