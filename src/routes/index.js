import CoreLayout from 'layouts/CoreLayout'
import Home from './Home'
import CounterRoute from './Counter'
import AllCardsView from './AllCardsView'
import NotFound from './NotFound'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    CounterRoute(store),
    AllCardsView,
    NotFound
  ]
})

export default createRoutes
