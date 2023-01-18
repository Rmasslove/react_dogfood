export const REDUX_LS_KEY = 'basketRedux'

export const initialState = {
  basket: [],
}
export const getInitialState = () => {
  const stateLS = localStorage.getItem(REDUX_LS_KEY)

  return stateLS ? JSON.parse(stateLS) : initialState
}
