import { createSlice } from '@reduxjs/toolkit' // Импорт компонента
import { getBasketIdsInitialState } from '../initState'

const basketIdsSlice = createSlice({ // Срез для корзины
  name: 'basketIds',
  initialState: getBasketIdsInitialState(), // Вызов начального состояния
  reducers: { // Редьюсеры
    newArrBasketIdsRedux(state, action) {
      return action.payload // Получаем и записываем новый []
    },
  },
})

export const getBasketIdsSliceSelector = (store) => store.basketIds // Выбор корзыны в (store)

export const { newArrBasketIdsRedux } = basketIdsSlice.actions // Методы для среза

export const basketIdsReducer = basketIdsSlice.reducer // Связь редьюсера со срезом в (store)
