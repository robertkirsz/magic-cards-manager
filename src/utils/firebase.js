import firebase from 'firebase'

const config = {
  apiKey:            'AIzaSyDwDacwAuGy4LxSOJnJKgVDOBSgHQm6PgU',
  authDomain:        'mtg-collection-cd492.firebaseapp.com',
  databaseURL:       'https://mtg-collection-cd492.firebaseio.com',
  storageBucket:     'mtg-collection-cd492.appspot.com',
  messagingSenderId: '378575387948'
}

export const app      = firebase.initializeApp(config)
export const auth     = firebase.auth()
export const database = firebase.database()
