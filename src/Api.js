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

  getProductIds(ids) { // Функция получение нескольких товаров по Id
    try {
      return Promise.all(ids.map((id) => fetch(`${this.path}/products/${id}`, { // Запрос на сервер
        headers: { // заголовок
        // eslint-disable-next-line quote-props
          'authorization': `Bearer ${this.token}`, // Строка с токеном
        },
      }).then((res) => res.json()))) // ответ в json
    } catch (error) { // Отлов ошибки
      throw new Error(error)
    }
  }

  getProductId(id) { // Функция получение товара по Id
    try {
      return fetch(`${this.path}/products/${id}`, { // Запрос на сервер
        headers: { // заголовок
        // eslint-disable-next-line quote-props
          'authorization': `Bearer ${this.token}`, // Строка с токеном
        },
      })
    } catch (error) { // Отлов ошибки
      throw new Error(error)
    }
  }

  getReviewProductId(id) { // Функция получение отзывов товара по Id
    try {
      return fetch(`${this.path}/products/review/${id}`, { // Запрос на сервер
        headers: { // заголовок
        // eslint-disable-next-line quote-props
          'authorization': `Bearer ${this.token}`, // Строка с токеном
        },
      })
    } catch (error) { // Отлов ошибки
      throw new Error(error)
    }
  }

  addReviewProductId(id, body) { // Функция добавление нового товара
    try {
      return fetch(`${this.path}/products/review/${id}`, { // Запрос на сервер
        method: 'POST', // метод
        headers: { // заголовок
          'Content-Type': 'application/json', // Информация в заголовке
          // eslint-disable-next-line quote-props
          'authorization': `Bearer ${this.token}`, // Строка с токеном
        },
        body: JSON.stringify(body),
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

  getUserDetailsId(id) { // Функция получение информации о пользователе по токену
    try {
      return fetch(`${this.path}/v2/${this.group}/users/${id}`, { // Запрос на сервер
        headers: { // заголовок
        // eslint-disable-next-line quote-props
          'authorization': `Bearer ${this.token}`, // Строка с токеном
        },
      })
    } catch (error) { // Отлов ошибки
      throw new Error(error)
    }
  }

  putLike(id) { // Функция установки лайка по (id)
    try {
      return fetch(`${this.path}/products/likes/${id}`, { // Запрос на сервер
        method: 'PUT', // метод
        headers: { // заголовок
        // eslint-disable-next-line quote-props
          'authorization': `Bearer ${this.token}`, // Строка с токеном
        },
      })
    } catch (error) { // Отлов ошибки
      throw new Error(error)
    }
  }

  delLike(id) { // Функция удаления лайка по (id)
    try {
      return fetch(`${this.path}/products/likes/${id}`, { // Запрос на сервер
        method: 'DELETE', // метод
        headers: { // заголовок
        // eslint-disable-next-line quote-props
          'authorization': `Bearer ${this.token}`, // Строка с токеном
        },
      })
    } catch (error) { // Отлов ошибки
      throw new Error(error)
    }
  }

  addProduct(body) { // Функция добавление нового товара
    try {
      return fetch(`${this.path}/products`, { // Запрос на сервер
        method: 'POST', // метод
        headers: { // заголовок
          'Content-Type': 'application/json', // Информация в заголовке
          // eslint-disable-next-line quote-props
          'authorization': `Bearer ${this.token}`, // Строка с токеном
        },
        body: JSON.stringify(body),
      })
    } catch (error) { // Отлов ошибки
      throw new Error(error)
    }
  }

  changeProduct(id, body) { // Функция изменения товара
    try {
      return fetch(`${this.path}/products/${id}`, { // Запрос на сервер
        method: 'PATCH', // метод
        headers: { // заголовок
          'Content-Type': 'application/json', // Информация в заголовке
          // eslint-disable-next-line quote-props
          'authorization': `Bearer ${this.token}`, // Строка с токеном
        },
        body: JSON.stringify(body),
      })
    } catch (error) { // Отлов ошибки
      throw new Error(error)
    }
  }

  delProduct(id) { // Функция удаления товара по (id)
    try {
      return fetch(`${this.path}/products/${id}`, { // Запрос на сервер
        method: 'DELETE', // метод
        headers: { // заголовок
        // eslint-disable-next-line quote-props
          'authorization': `Bearer ${this.token}`, // Строка с токеном
        },
      })
    } catch (error) { // Отлов ошибки
      throw new Error(error)
    }
  }

  searchProduct(value) { // Функция поиска товаров
    try {
      return fetch(`${this.path}/products/search?query=${value}`, { // Запрос на сервер
        method: 'GET', // метод
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
