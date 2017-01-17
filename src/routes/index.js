import CoreLayout   from 'layouts/CoreLayout'
import HomeView     from 'routes/HomeView'
import AllCardsView from 'routes/AllCardsView'
import MyCardsView  from 'routes/MyCardsView'
import CardView     from 'routes/CardView'
import NotFound     from 'routes/NotFound/NotFound' // TODO: make index.js for that
import Firebase     from 'routes/Firebase'

// TODO: add route names

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: { component: HomeView },
  childRoutes: [
    { path: 'firebase', component: Firebase },
    {
      path: 'all-cards',
      component: AllCardsView,
      childRoutes: [
        { path: '/all-cards/:cardUrl', component : CardView }
      ]
    },
    {
      path: 'my-cards',
      component: MyCardsView,
      childRoutes: [
        { path: '/my-cards/:cardUrl', component : CardView }
      ]
    },
    { path: '*', component : NotFound }
  ]
})

export default createRoutes
