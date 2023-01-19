import { createSlice } from '@reduxjs/toolkit' // Импорт компонента
import { getBasketInitialState } from '../initState' // Импорт компонента

const basketSlice = createSlice({ // Срез для корзины
  name: 'basket',
  initialState: getBasketInitialState(), // Вызов начального состояния
  reducers: { // Редьюсеры
    newArrBasketRedux(state, action) {
      return action.payload // Получаем и записываем новый []
    },
  },
})

export const getBasketSliceSelector = (store) => store.basket // Выбор корзыны в (store)

export const { newArrBasketRedux } = basketSlice.actions // Методы для среза

export const basketReducer = basketSlice.reducer // Связь редьюсера со срезом
