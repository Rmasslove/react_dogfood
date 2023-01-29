import { createSlice } from '@reduxjs/toolkit' // Импорт компонента
import { getIsLikeProductsInitialState } from '../initState' // Импорт компонента

const isLikeProductsSlice = createSlice({ // Срез для избранных товаров
  name: 'isLikeProducts',
  initialState: getIsLikeProductsInitialState(), // Вызов начального состояния
  reducers: { // Редьюсеры
    newArrIsLikeProductsRedux(state, action) {
      return action.payload // Получаем и записываем новый []
    },
  },
})

export const getIsLikeProductsSliceSelector = (store) => store.isLikeProducts // Выбор среза в store

export const { newArrIsLikeProductsRedux } = isLikeProductsSlice.actions // Методы для среза

export const isLikeProductsReduser = isLikeProductsSlice.reducer // Связь редьюсера со срезом
