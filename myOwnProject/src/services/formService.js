const useForm = () => {
  window.data = {};
  let errors = {};
  /*********************  validateTerm   *********************/

  const validateTerm = (field, validation) => {
    let errors = [];
    const {
      regex,
      numMin = 0,
      numMax = 1_000_000_000_000,
      min = 0,
      max = 1_000_000_000_000,
      upperCase = null,
      lowerCase = null,
    } = validation;

    const { value: input } = field;

    if (+input < +numMin) {
      errors.push(`The field must be at least ${numMin}`);
    }

    if (+input > +numMax) {
      errors.push(`The field cannot be more then ${numMax}`);
    }

    if (input.length < +min) {
      errors.push(`The field must be at least ${min} characters long`);
    }

    if (input.length > +max) {
      errors.push(`The field cannot contaion more then ${max} characters `);
    }

    if (lowerCase) {
      if (!input.match(/[a-z]/g)) {
        errors.push(`The field must contain at least one lower case letter`);
      }
    }

    if (upperCase) {
      if (!input.match(/[A-Z]/g)) {
        errors.push(`The field must contain at least one upper case letter`);
      }
    }

    if (regex) {
      if (!input.match(regex)) {
        errors.push(`The field must contain the following regex: ${regex}`);
      }
    }
    if (input.match(/[^A-Za-z0-9א-תА-Яа-я\s!@#$%^&*_/:.-]/g)) {
      errors.push(`You used a forbidden character`);
    }

    return errors.length ? errors : null; // if there are errors return them, else return null
  };

  /*********************  onValidateField  *********************/

  const onValidateField = (input, errorSpan, validation) => {
    data[input.name] = input.value;
    errorSpan.innerHTML = "";
    const errorsForField = validateTerm(input, validation);
    if (errorsForField) {
      errorsForField.forEach(
        (error) => (errorSpan.innerHTML += `${error} <br>`)
      );
      errors[input.name] = errorsForField;
      return;
    }
    delete errors[input.name]; // если ошибок нет то удаляем поле из объекта errors
  };

  /*********************  onCheckErrors  *********************/
  const onCheckErrors = (schema, btn) => {
    const isArrayEmpty = schema.filter((key) => !data[key]);
    if (isArrayEmpty.length) return btn.setAttribute("disabled", "disabled");
    const keys = Object.keys(errors); // получаем массив ключей из объекта errors
    if (keys.length) return btn.setAttribute("disabled", "disabled");
    btn.removeAttribute("disabled");
  };

  /*********************  onValidateForm  *********************/
  const onChangeInputField = (schema, element, btn) => {
    const { input, errorSpan, validation } = element;
    onValidateField(input, errorSpan, validation);
    onCheckErrors(schema, btn);
  };

  /*********************  onClearFormFields  *********************/
  const onClearFormFields = (btn, fields, errorSpan) => {
    fields.forEach((field) => {
      field.removeEventListener("input", onChangeInputField);
      field.value = "";
    });
    errorSpan.forEach((span) => (span.innerHTML = ""));
    btn.setAttribute("disabled", "disabled");
    errors = {};
    data = {};
  };

  return {
    onCheckErrors,
    onChangeInputField,
    onClearFormFields,
  };
}; // end of useForm

export default useForm;

//#region Function explanation
/** //todo 1.validateTerm
// 1.validateTerm эта функция валидирует одно поле ввода и возвращает массив ошибок или null если ошибок нет (валидация прошла успешно) , у нас есть Заготоавленные валидации в виде объекта validation
 */
/** //todo 2.onValidateField
// 2.onValidateField эта функция будет выдавать ощибки валидации Пользователю в реальном времени (при вводе данных) , validateTerm это всего лишь вспомогательная функция для этой
//const errorsForField = validateTerm(input, validation); // результат этой функции будет массивом ошибок или null если ошибок нет
//if (errorsForField) {
// errorsForField.forEach((error) => errorSpan.innerHTML += `${error} <br>`); // выводим ошибки в реальном времени в html элемент   <span class="error"></span> который находится в html файле в теге  <form> </form>    <span class="error"></span> это тег который мы будем заполнять ошибками валидации в реальном времени (при вводе данных)
// errors[input.name] = errorsForField; // записываем ошибки в объект errors который находится в начале файла const errors = {};  это объект который будет хранить все ошибки валидации в виде ключей и значений
delete errors[input.name]; // в случае если ошибок нет в errorsForField в даном поле ввода , но есть других полей ввода с ошибками , то мы удаляем из объекта errors поле ввода с ошибками
 */
/** //todo 3.onChangeInputField
// 3.onChangeInputField это функция которая будет вызываться при каждом изменении поля ввода (при вводе данных) , она будет вызывать функцию onValidateField которая будет валидировать поле ввода и выводить ошибки в реальном времени
//INPUTלהגיב לשינויים בשדות הטקסט ב

 */
/** //todo 4.onCheckErrors
 * 
 // 4.onCheckErrors - эта функция будет проверять есть ли ошибки валидации в объекте errors
//?Если есть то кнопка отправки формы будет заблокирована
//!Если нет то кнопка отправки формы будет разблокирована
//const keys = Object.keys(errors); //* получаем массив ключей из объекта errors
//? errors מקבלים מערך של מפתחות מאובייקט
//todo סיכום של הפונקציה
  //todo const onCheckErrors = (schema, btn) => {
    const isArrayEmpty = schema.filter((key) => !data[key]);
    if (isArrayEmpty.length) return btn.setAttribute("disabled", "disabled");
    //! או שלא הזנתם משהו בשדה, ואז יש לנו מערך של מפתחות שלא מכילות ערך
    const keys = Object.keys(errors); // получаем массив ключей из объекта errors
    if (keys.length) return btn.setAttribute("disabled", "disabled");
    //! או שיש לו בשדה שגיאות 
    //! על שני התנאים האלה הוא ישאיר את הכפתור כבוי
    btn.removeAttribute("disabled");
  }; */
/** //todo 5.onClearFormFields
    // 5.onClearFormFields - эта функция будет очищать поля ввода формы
    const onClearFormFields = (btn, fields, errorSpan) => { //! btn - кнопка отправки формы , fields - поля ввода формы , errorSpan - элементы span для вывода ошибок
    fields.forEach((field) => {
      field.removeEventListener("input", onChangeInputField); //! удаляем обработчик события input у полей ввода формы , чтобы не было утечки памяти (чтобы не было множества обработчиков событий)
      field.value = ""; // очищаем поля ввода формы
    });
    errorSpan.forEach((span) => (span.innerHTML = "")); //! очищаем элементы span для вывода ошибок валидации полей ввода формы  
    btn.setAttribute("disabled", "disabled"); //! блокируем кнопку отправки формы
    errors = {}; // очищаем объект errors
    data = {}; // очищаем объект data
    //!Резюме функции onClearFormFields - 
    Очищает поля ввода формы , элементы span для вывода ошибок валидации полей ввода формы , блокирует кнопку отправки формы , очищает объекты errors и data
  };

 */
//#endregion
