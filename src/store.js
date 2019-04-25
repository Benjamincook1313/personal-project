import { createStore, /*combineReducers,*/ applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import reducer from './Ducks/reducer'

// const rootReducer = combineReducers({
  
// })

export default createStore(reducer, applyMiddleware(promiseMiddleware))