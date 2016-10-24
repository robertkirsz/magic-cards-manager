import Home         from 'routes/Home'
import NotFound     from 'routes/NotFound'
import CoreLayout   from 'layouts/CoreLayout'
import AllCardsView from 'routes/AllCardsView'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    AllCardsView,
    NotFound
  ]
})

export default createRoutes
