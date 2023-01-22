import {
  HOME_PAGE_LINK,
  MASTER_CLASS_PAGE_LINK,
  ABOUT_PAGE_LINK,
  ARTICLES_PAGE_LINK,
  BOOKS_PAGE_LINK,
  SCHEDULE_PAGE_LINK,
  COMMENTS_PAGE_LINK,
  CONTACTS_PAGE_LINK,
  FILM_VIBE_PAGE_LINK,
  ONLINE_PROJECT_PAGE_LINK,
  LINK_HOME_PAGE,
  CREATE_PIC_PAGE_LINK,
  LOGIN_PAGE_LINK,
  SLIDER_PREV_BTN,
  SLIDER_NEXT_BTN,
  URL_CREATE_PIC_FIELD,
  URL_CREATE_PIC_ERROR,
  SUBMIT_CREATE_PIC_BTN,
  CANCEL_BTN,
  ALT_CREATE_PIC_FIELD,
  CREDIT_CREATE_PIC_FIELD,
  PRICE_CREATE_PIC_FIELD,
  PRICE_CREATE_PIC_ERROR,
} from "./services/domService.js";
import useForm from "./services/formService.js";
import PAGES from "./models/pageModel.js";
import { onChangePage } from "./routes/router.js";
import { setCounter } from "./services/picService.js";
import { renderSlider as render } from "./services/renderSlider.js";
import initialData from "./initialData/initialData.js";
import Picture from "./models/PictureModel.js";
import User from "./models/UserModel.js";

//#region הגדרת משתנים גלובליים
let { pictures, users } = initialData(); //Destructuring from initialData function the pictures array to
console.log(pictures);
console.log(users);
let counter = 0;
//#endregion
//#region Checking getter and setter methods
const pictureExample = new Picture(pictures[2], pictures);
console.log(pictureExample);
console.log(pictureExample._id);
console.log(pictureExample.credit); // "credit"
console.log(pictureExample.price); // 100
pictureExample.credit = "new credit";
pictureExample.price = 99; // "Price is too low"
console.log(pictureExample.credit); // "new credit"
console.log(
  pictureExample.price + ` Nothing happened because the price is too low`
); // 500 Nothing happened because the price is too low
pictureExample.price = 101; // 101
console.log(pictureExample.price); // 101
//#endregion

//#region אתחול הצגה ראשונית
render(pictures);
//#endregion
//#region slider logic
const onChangeSliderPic = (controller) => {
  counter = setCounter(pictures, counter, controller);
  render(pictures, counter);
};
//#endregion

//#region האזנה לאירועים   onChangePage
//ניתוב דפים
HOME_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.HOME));
MASTER_CLASS_PAGE_LINK.addEventListener("click", () =>
  onChangePage(PAGES.MASTER_CLASS)
);
ABOUT_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.ABOUT));
ARTICLES_PAGE_LINK.addEventListener("click", () =>
  onChangePage(PAGES.ARTICLES)
);
BOOKS_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.BOOKS));
SCHEDULE_PAGE_LINK.addEventListener("click", () =>
  onChangePage(PAGES.SCHEDULE)
);
COMMENTS_PAGE_LINK.addEventListener("click", () =>
  onChangePage(PAGES.COMMENTS)
);
CONTACTS_PAGE_LINK.addEventListener("click", () =>
  onChangePage(PAGES.CONTACTS)
);
FILM_VIBE_PAGE_LINK.addEventListener("click", () =>
  onChangePage(PAGES.FILM_VIBE)
);
ONLINE_PROJECT_PAGE_LINK.addEventListener("click", () =>
  onChangePage(PAGES.ONLINE_PROJECT)
);
CREATE_PIC_PAGE_LINK.addEventListener("click", () => handleCreatePic());
LOGIN_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.LOGIN));
LINK_HOME_PAGE.addEventListener("click", () => onChangePage(PAGES.HOME));

//#endregion

//#region מצגת תמונות add event listeners
SLIDER_PREV_BTN.addEventListener("click", () => onChangeSliderPic("prev"));
SLIDER_NEXT_BTN.addEventListener("click", () => onChangeSliderPic("next"));
//#endregion

//#region Create picture form
export const handleCreatePic = () => {
  // להרשם לאירועי הזנת המידע בשדות

  onChangePage(PAGES.CREATE_PIC);
  //
  createPicFromFieldsListeners();
  CANCEL_BTN.addEventListener("click", () => handleCancelCreatePic);
  SUBMIT_CREATE_PIC_BTN.addEventListener("click", () => handleSubmitNewPic);
};
export const createPicFromFieldsListeners = () => {
  const { onChangeInputField } = useForm();
  const schema = [`url`, `price`];
  URL_CREATE_PIC_FIELD.addEventListener("input", (e) => {
    const validation = {
      regex: /^http[s]?\:\/\/.{1,}.(jpg|png|jpeg)$/g,
      min: 10,
      lowerCase: true,
    };

    const element = {
      input: e.target,
      errorSpan: URL_CREATE_PIC_ERROR,
      validation,
    };
    onChangeInputField(schema, element, SUBMIT_CREATE_PIC_BTN);
  });
  PRICE_CREATE_PIC_FIELD.addEventListener("input", (e) => {
    const validation = {
      regex: /\d/g,
      numMin: 100,
    };
    const element = {
      input: e.target,
      errorSpan: PRICE_CREATE_PIC_ERROR,
      validation,
    };
    onChangeInputField(schema, element, SUBMIT_CREATE_PIC_BTN);
  });
};
export const handleCancelCreatePic = () => {};
export const handleSubmitNewPic = () => {};
//#endregion

//#region Explanation of the code
/** //todo 1.handleCreatePic
    export const handleCreatePic = () => {   
 //* в первую очередь он войдёт в Страницу создания картинки
  onChangePage(PAGES.CREATE_PIC);

  // להרשם לאירועי הזנת המידע בשדות 

  createPicFromFieldsListeners(); 
  //* второй шаг это регистрация на события ввода данных в поля

  CANCEL_BTN.addEventListener("click", () => handleCancelCreatePic()); 
  //! отмена создания картинки
  SUBMIT_CREATE_PIC_BTN.addEventListener("click", () => handleSubmitNewPic()); 
  //! отправка новой картинки
};
export const createPicFromFieldsListeners = () => { 
  //! регистрация на события ввода данных в поля
  const { onChangeInputField } = useForm(); 
  //! импортируем функцию onChangeInputField из useForm (подробнее в useForm.js)  
  const schema = [`url`]; 
  //? создаём схему валидации для поля URL
  URL_CREATE_PIC_FIELD.addEventListener("input", (e) => { 
    //! регистрируем на событие ввода данных в поле URL  
    const validation = { 
    //! создаём объект с параметрами валидации для поля URL   
      regex: /^http[s]?\:\/\/.{1,}.(jpg|png|jpeg|gif)$/g,
      min: 10,
      lowerCase: true,
    };
    const element = { //* создаём объект с параметрами поля URL   
      input: e.target, //* в поле input передаём само поле
      error: URL_CREATE_PIC_ERROR, //* в поле error передаём элемент с ошибкой
      validation, //* в поле validation передаём объект с параметрами валидации
    };
    onChangeInputField(schema, element, SUBMIT_CREATE_PIC_BTN); //! вызываем функцию onChangeInputField из useForm.js 
  });
};
 */
//#endregion
