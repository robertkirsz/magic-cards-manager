import CoreLayout   from 'layouts/CoreLayout'
import HomeView     from 'routes/HomeView'
import AllCardsView from 'routes/AllCardsView'
import CardView     from 'routes/CardView'
import NotFound     from 'routes/NotFound/NotFound'

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: { component: HomeView },
  childRoutes: [
    {
      path: 'cards',
      component: AllCardsView,
      childRoutes: [
        { path: '/cards/:id', component : CardView }
      ]
    },
    { path: '*', component : NotFound }
  ]
})

export default createRoutes
