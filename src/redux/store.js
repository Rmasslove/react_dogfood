import { configureStore } from '@reduxjs/toolkit'
import { REDUX_LS_KEY } from './initState'
import { basketReducer } from './slices/basketSlice'

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
})

store.subscribe(() => {
  localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()))
})
