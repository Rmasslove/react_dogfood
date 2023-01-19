import { createSlice } from '@reduxjs/toolkit' // Импорт компонента
import { getAboutUserInitialState } from '../initState' // Импорт компонента

const aboutUserSlice = createSlice({ // Срез для информации о (user)
  name: 'aboutUser',
  initialState: getAboutUserInitialState(), // Вызов начального состояния
  reducers: { // Редьюсеры
    newAboutUserRedux(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload // Меняем состояние для (user)
    },
    newAboutTokenRedux(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.token = action.payload // Меняем состояние для (token)
    },
  },
})

export const getAboutUserSliceSelector = (store) => store.aboutUser // Выбор о (user) в (store)

export const { newAboutUserRedux, newAboutTokenRedux } = aboutUserSlice.actions // Методы для среза

export const aboutUserReducer = aboutUserSlice.reducer // Связь редьюсера со срезом
