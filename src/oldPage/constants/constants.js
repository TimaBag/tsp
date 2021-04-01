export const SERVER_URL = "http://www.tradehouse.kz/";
export const REST_API_URL = "http://194.4.58.101/api/rest-api/";

export const STD_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export const ERRORS = {
	ACCOUNT_NOT_FOUND: "Не удалось найти аккаунт",
  ACCOUNT_ALREADY_EXISTS: "Пользователь с таким именем уже существует",
	NUMBER: "Ошибка # ",
	NO_INTERNET: "Не удалось подключиться к сети",
	INCORRECT_PASSWORD: "Неверный пароль. Повторите попытку",
  INCORRECT_EMAIL: "Неправильный email",
	SERVER_ERROR: "Ошибка на сервере. Код:",
  PASSWORD_NOT_MATCH: "Подтвердите пароль",
  EMPTY_FIELD: "заполните поле '_'"
}

export const getTradeStatus = (status) => {
  switch (status) {
    case 0:
      return 'Новый';
    case 1:
      return 'На согласовании';
    case 2:
      return 'Согласован';
    case 3:
      return 'Подписан';
    default:
      return 'Новый'
  }
}
