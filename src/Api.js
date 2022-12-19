class Api { // Класс (Api)
  constructor(token) { // Конструктор принимающий информацию о (token)
    this.path = 'https://api.react-learning.ru' // Основной адрес (URL)
    // eslint-disable-next-line quotes
    this.group = "sm8" // группа, eslint меняет ковычки ("") на ('') пришлось отключить
    this.token = token // Токен
  }

  signUp(body) { // Функция запрос на регистрацию
    try {
      // eslint-disable-next-line no-param-reassign
      body.group = this.group // Добавление в (body) информацию о группе
      return fetch(`${this.path}/signup`, { // Запрос на сервер
        method: 'POST', // метод
        headers: { // заголовок
          'Content-Type': 'application/json', // Информация в заголовке
        },
        body: JSON.stringify(body), // Прообразование (body) в строку
      })
    } catch (error) { // Отлов ошибки
      throw new Error(error)
    }
  }

  signIn(body) { // Функция запрос на авторизацию
    try {
      return fetch(`${this.path}/signin`, { // Запрос на сервер
        method: 'POST', // метод
        headers: { // заголовок
          'Content-Type': 'application/json', // Информация в заголовке
        },
        body: JSON.stringify(body), // Прообразование (body) в строку
      })
    } catch (error) { // Отлов ошибки
      throw new Error(error)
    }
  }

  getProducts() { // Функция запрос всех продуктов
    try {
      return fetch(`${this.path}/products`, { // Запрос на сервер
        headers: { // заголовок
        // eslint-disable-next-line quote-props
          'authorization': `Bearer ${this.token}`, // Строка с токеном
        },
      })
    } catch (error) { // Отлов ошибки
      throw new Error(error)
    }
  }

  getUserDetails() { // Функция получение информации о пользователе по токену
    try {
      return fetch(`${this.path}/v2/${this.group}/users/me`, { // Запрос на сервер
        headers: { // заголовок
        // eslint-disable-next-line quote-props
          'authorization': `Bearer ${this.token}`, // Строка с токеном
        },
      })
    } catch (error) { // Отлов ошибки
      throw new Error(error)
    }
  }
}

export { Api } // Экспорт класса
