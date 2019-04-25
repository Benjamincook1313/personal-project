import axios from 'axios'

const  initialState = {
  loggedIn: false,
  menu: false,
}

export const TOGGLE_LOGIN = 'TOGGLE_LOGIN'
export const DISPLAY_MENU = 'DISPLAY_MENU'

export function toggleLogin(){
  return {
    type: TOGGLE_LOGIN
  }
}

export function displayMenu(){
  return {
    type: DISPLAY_MENU
  }
}

export function checkLoggedIn(){
  axios.get('/loggedIn').then(res => res.data)
  return 
}

export default function(state = initialState, action){
  const { type } = action
  switch(type) {
    case TOGGLE_LOGIN:
      return {...state, loggedIn: !state.loggedIn}
    case DISPLAY_MENU:
      return {...state, menu: !state.menu}
    default:
      return state
  }
}