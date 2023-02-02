export const REDUX_LS_KEY1 = 'basketRedux' // Сущность для записи названия ключа в (localStorage)
export const REDUX_LS_KEY2 = 'aboutUserRedux' // Сущность для записи названия ключа в (localStorage)
export const REDUX_LS_KEY3 = 'dataProductsRedux' // Сущность для записи названия ключа в (localStorage)
export const REDUX_LS_KEY4 = 'isLikeProductsRedux' // Сущность для записи названия ключа в (localStorage)
export const REDUX_LS_KEY5 = 'basketIdsRedux' // Сущность для записи названия ключа в (localStorage)

export const initialState = { // Начальное состояние для редьюсеров
  basket: [],
  aboutUser: {
    user: '',
    token: '',
  },
  dataProducts: [],
  isLikeProducts: [],
  basketIds: [],
}

export const getBasketInitialState = () => { // Функция вызова начального состояния
  const stateLS = localStorage.getItem(REDUX_LS_KEY1) // Запись в сущность из (localStorage)

  return stateLS ? JSON.parse(stateLS) : initialState.basket // (localStorage) или (initialState)
}

export const getAboutUserInitialState = () => { // Функция вызова начального состояния
  const stateLS = localStorage.getItem(REDUX_LS_KEY2) // Запись в сущность из (localStorage)

  return stateLS ? JSON.parse(stateLS) : initialState.aboutUser // (localStorage) или (initialState)
}

export const getDataProductsInitialState = () => { // Функция вызова начального состояния
  const stateLS = localStorage.getItem(REDUX_LS_KEY3) // Запись в сущность из (localStorage)

  return stateLS ? JSON.parse(stateLS) : initialState.dataProducts // (localStor) или (initialState)
}

export const getIsLikeProductsInitialState = () => { // Функция вызова начального состояния
  const stateLS = localStorage.getItem(REDUX_LS_KEY4) // Запись в сущность из (localStorage)

  return stateLS ? JSON.parse(stateLS) : initialState.isLikeProducts // (localStor) или initialState
}

export const getBasketIdsInitialState = () => { // Функция вызова начального состояния
  const stateLS = localStorage.getItem(REDUX_LS_KEY5) // Запись в сущность из (localStorage)

  return stateLS ? JSON.parse(stateLS) : initialState.basketIds // (localStorage) или (initialState)
}
