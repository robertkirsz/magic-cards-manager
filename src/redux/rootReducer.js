import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import collection from './modules/collection'
import database from './modules/saveCardsFromAjax'
import application from './modules/application'
import modals from './modules/modals'
import decks from './modules/decks'

export default combineReducers({
  counter,
  router,
  collection,
  database,
  application,
  modals,
  decks
})
