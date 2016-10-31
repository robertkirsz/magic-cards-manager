import { combineReducers } from 'redux'
import locationReducer from './location'
import allCards from './allCards'
import myCards from './myCards'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    allCards,
    myCards,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
