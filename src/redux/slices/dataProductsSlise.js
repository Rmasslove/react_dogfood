import { createSlice } from '@reduxjs/toolkit' // Импорт компонента
import { getDataProductsInitialState } from '../initState' // Импорт компонента

const dataProductsSlice = createSlice({ // Срез для товаров
  name: 'dataProducts',
  initialState: getDataProductsInitialState(), // Вызов начального состояния
  reducers: { // Редьюсеры
    newArrDataProductsRedux(state, action) {
      return action.payload // Получаем и записываем новый []
    },
  },
})

export const getDataProductsSliceSelector = (store) => store.dataProducts // Выбор продукт в (store)

export const { newArrDataProductsRedux } = dataProductsSlice.actions // Методы для среза

export const dataProductsReduser = dataProductsSlice.reducer // Связь редьюсера со срезом
