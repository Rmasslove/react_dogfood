import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../initState'

const basketSlice = createSlice({
  name: 'basket',
  initialState: getInitialState().basket,
  reducers: {
    newArrBasketRedux(state, action) {
      return action.payload
    },
  },
})

export const getBasketSliceSelector = (store) => store.basket

export const { newArrBasketRedux } = basketSlice.actions

export const basketReducer = basketSlice.reducer
