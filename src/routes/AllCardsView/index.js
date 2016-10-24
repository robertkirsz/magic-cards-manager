import AllCardsView from './views/AllCardsView'
import CardView     from 'routes/CardView'

export default {
  component   : AllCardsView,
  path        : 'cards',
  childRoutes : [
    CardView
  ]
}
