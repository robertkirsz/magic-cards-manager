import { auth }      from 'utils/firebase'
import CoreLayout    from 'layouts/CoreLayout'
import HomeView      from 'routes/HomeView'
import AllCardsView  from 'routes/AllCardsView'
import MyCardsView   from 'routes/MyCardsView'
import CardView      from 'routes/CardView'
import ProfileView   from 'routes/ProfileView'
import SettingsView  from 'routes/SettingsView'
import NotFoundView  from 'routes/NotFoundView'

// Redirects unathorized users
const requireAuth = (nextState, replace) => {
  if (!auth.currentUser) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: { component: HomeView },
  childRoutes: [
    {
      path: 'all-cards',
      component: AllCardsView,
      showAppButtons: true,
      childRoutes: [
        { path: '/all-cards/:cardUrl', component: CardView }
      ]
    },
    {
      path: 'my-cards',
      component: MyCardsView,
      showAppButtons: true,
      onEnter: requireAuth,
      childRoutes: [
        { path: '/my-cards/:cardUrl', component: CardView }
      ]
    },
    {
      path: 'settings',
      component: SettingsView,
      onEnter: requireAuth
    },
    {
      path: 'profile',
      component: ProfileView,
      onEnter: requireAuth
    },
    {
      path: '*',
      component: NotFoundView
    }
  ]
})

export default createRoutes
