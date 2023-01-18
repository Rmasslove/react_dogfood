import { configureStore } from '@reduxjs/toolkit'
import { REDUX_LS_KEY } from './initState'
import { basketReducer } from './slices/basketSlice'
// import { aboutUserReducer } from './slices/aboutUserSlice'

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    // aboutUser: aboutUserReducer,
  },
})

store.subscribe(() => {
  localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()))
  // localStorage.setItem(REDUX_LS_KEY2, JSON.stringify(store.getState().aboutUser))
})
