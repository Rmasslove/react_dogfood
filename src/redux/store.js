import { configureStore } from '@reduxjs/toolkit' // Импорт компонента
import {
  REDUX_LS_KEY1, REDUX_LS_KEY2, REDUX_LS_KEY3, REDUX_LS_KEY4,
} from './initState' // Импорт компонента
import { basketReducer } from './slices/basketSlice' // Импорт компонента
import { aboutUserReducer } from './slices/aboutUserSlice' // Импорт компонента
import { dataProductsReduser } from './slices/dataProductsSlise'
import { isLikeProductsReduser } from './slices/isLikeProductsSlice'

export const store = configureStore({ // Конфигурация (store)
  reducer: { // Редьюсеры для корзины и информации о (user)
    basket: basketReducer, // Корзина с товарами
    aboutUser: aboutUserReducer, // Информация о пользователе
    dataProducts: dataProductsReduser, // Загруженный массив товаров
    isLikeProducts: isLikeProductsReduser, // Избранные товары
  },
})

store.subscribe(() => { // Подписчики в (localStorage)
  localStorage.setItem(REDUX_LS_KEY1, JSON.stringify(store.getState().basket)) // Запись о корзине
  localStorage.setItem(REDUX_LS_KEY2, JSON.stringify(store.getState().aboutUser)) // Запись о юзере
  localStorage.setItem(REDUX_LS_KEY3, JSON.stringify(store.getState().dataProducts)) // Зап о товар.
  localStorage.setItem(REDUX_LS_KEY4, JSON.stringify(store.getState().isLikeProducts)) // Запись Lok
})
