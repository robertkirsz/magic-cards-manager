import CoreLayout   from 'layouts/CoreLayout'
import Home         from 'routes/Home'
import AllCardsView from 'routes/AllCardsView'
import NotFound     from 'routes/NotFound'

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
