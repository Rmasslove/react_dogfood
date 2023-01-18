export const REDUX_LS_KEY = 'basketRedux'
// export const REDUX_LS_KEY2 = 'aboutUserRedux'

export const initialState = {
  basket: [],
  // aboutUser: {
  // user: '',
  // token: '',
  // },
}
export const getInitialState = () => {
  const stateLS = localStorage.getItem(REDUX_LS_KEY)

  return stateLS ? JSON.parse(stateLS) : initialState
}
