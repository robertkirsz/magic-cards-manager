import CoreLayout    from 'layouts/CoreLayout'
import HomeView      from 'routes/HomeView'
import AllCardsView  from 'routes/AllCardsView'
import MyCardsView   from 'routes/MyCardsView'
import CardView      from 'routes/CardView'
import ProfileView   from 'routes/ProfileView'
import SettingsView  from 'routes/SettingsView'
import NotFoundView  from 'routes/NotFoundView'

// TODO: add route names

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: { component: HomeView },
  childRoutes: [
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
    { path: 'settings', component : SettingsView },
    { path: 'profile', component : ProfileView },
    { path: '*', component : NotFoundView }
  ]
})

export default createRoutes
