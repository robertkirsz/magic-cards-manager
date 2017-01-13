import { combineReducers } from 'redux'

import user     from './user'
import layout   from './layout'
import myCards  from './myCards'
import allCards from './allCards'
import location from './location'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location,
    user,
    allCards,
    myCards,
    layout,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
