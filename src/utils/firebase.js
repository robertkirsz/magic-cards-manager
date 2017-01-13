import firebase from 'firebase'

const config = {
  apiKey:            'AIzaSyDwDacwAuGy4LxSOJnJKgVDOBSgHQm6PgU',
  authDomain:        'mtg-collection-cd492.firebaseapp.com',
  databaseURL:       'https://mtg-collection-cd492.firebaseio.com',
  storageBucket:     'mtg-collection-cd492.appspot.com',
  messagingSenderId: '378575387948'
}

export const app              = firebase.initializeApp(config)
export const auth             = firebase.auth()
export const database         = firebase.database()
export const googleProvider   = new firebase.auth.GoogleAuthProvider()
export const facebookProvider = new firebase.auth.FacebookAuthProvider()

// LOGIN
// Code that check if user is logged in on launch is in CoreLayout
// Code for signing in/up is in LoginView
// Code for signing out is in (... Header?)
