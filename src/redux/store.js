import { configureStore } from '@reduxjs/toolkit' // Импорт компонента
import { REDUX_LS_KEY, REDUX_LS_KEY2 } from './initState' // Импорт компонента
import { basketReducer } from './slices/basketSlice' // Импорт компонента
import { aboutUserReducer } from './slices/aboutUserSlice' // Импорт компонента

export const store = configureStore({ // Конфигурация (store)
  reducer: { // Редьюсеры для корзины и информации о (user)
    basket: basketReducer,
    aboutUser: aboutUserReducer,
  },
})

store.subscribe(() => { // Подписчики в (localStorage)
  localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState().basket)) // Запись о корзине
  localStorage.setItem(REDUX_LS_KEY2, JSON.stringify(store.getState().aboutUser)) // Запись о юзере
})
