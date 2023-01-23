export const REDUX_LS_KEY1 = 'basketRedux' // Сущность для записи названия ключа в (localStorage)
export const REDUX_LS_KEY2 = 'aboutUserRedux' // Сущность для записи названия ключа в (localStorage)
export const REDUX_LS_KEY3 = 'dataProductsRedux' // Сущность для записи названия ключа в (localStorage)

export const initialState = { // Начальное состояние для редьюсеров
  basket: [],
  aboutUser: {
    user: '',
    token: '',
  },
  dataProducts: [],
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
