class Api { // Класс (Api)
  constructor(token) { // Конструктор принимающий информацию о (token)
    this.path = 'https://api.react-learning.ru' // Основной адрес (URL)
    // eslint-disable-next-line quotes
    this.group = "sm8" // eslint меняет ковычки ("") на ('') пришлось отключить
    this.token = token // Токен
  }

  signUp(body) { // Функция запрос на регистрацию
    // eslint-disable-next-line no-param-reassign
    body.group = this.group // Добавление в (body) информацию о группе
    return fetch(`${this.path}/signup`, { // Запрос на сервер
      method: 'POST', // метод
      headers: { // заголовок
        'Content-Type': 'application/json', // Информация в заголовке
      },
      body: JSON.stringify(body), // Прообразование (body) в строку
    })
  }

  signIn(body) { // Функция запрос на авторизацию
    return fetch(`${this.path}/signin`, { // Запрос на сервер
      method: 'POST', // метод
      headers: { // заголовок
        'Content-Type': 'application/json', // Информация в заголовке
      },
      body: JSON.stringify(body), // Прообразование (body) в строку
    })
  }

  getProducts() { // Функция запрос всех продуктов
    return fetch(`${this.path}/products`, { // Запрос на сервер
      headers: { // заголовок
        // eslint-disable-next-line quote-props
        'authorization': `Bearer ${this.token}`, // Строка с токеном
      },
    })
  }
}

export { Api } // Экспорт класса
