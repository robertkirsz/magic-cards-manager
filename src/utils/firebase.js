import firebase from 'firebase'

// Firebase configuration
const config = {
  apiKey: 'AIzaSyDwDacwAuGy4LxSOJnJKgVDOBSgHQm6PgU',
  authDomain: 'mtg-collection-cd492.firebaseapp.com',
  databaseURL: 'https://mtg-collection-cd492.firebaseio.com',
  storageBucket: 'mtg-collection-cd492.appspot.com',
  messagingSenderId: '378575387948'
}

// TODO: check if we still need to export those
export const app = firebase.initializeApp(config)
export const auth = firebase.auth()
export const database = firebase.database()

// List of available authentication providers
const providers = {
  google: new firebase.auth.GoogleAuthProvider(),
  facebook: new firebase.auth.FacebookAuthProvider(),
  twitter: new firebase.auth.TwitterAuthProvider(),
  github: new firebase.auth.GithubAuthProvider()
}

// Generic email and password sign in
export const firebaseSignIn = (email, password) => (
  auth.signInWithEmailAndPassword(email, password)
    .then(response => ({ success: true, id: response.uid, response }))
    .catch(response => ({ error: response.message, response }))
)

// Generic email and password sign up
export const firebaseSignUp = (email, password) => (
  auth.createUserWithEmailAndPassword(email, password)
    .then(response => ({ success: true, id: response.uid }))
    .catch(response => ({ error: response.message }))
)

// Sign out
export const firebaseSignOut = () => (
  auth.signOut()
    .then(() => ({ success: true }))
    .catch(response => ({ error: response.message }))
)

// Provider sign in
export const firebaseProviderSignIn = (providerName) => (
  auth.signInWithPopup(providers[providerName])
    .then(() => ({ success: true }))
    .catch(response => ({ error: response.message }))
)

// Generic 'set' function
export const firebaseSetData = (table, id, data) => (
  database
    .ref(table)
    .child(id)
    .set(data)
    .then(() => ({ success: true }))
    .catch(response => ({ error: response.message }))
)

export const setUserData = data => firebaseSetData('Users', data.id, data)

// LOGIN
// Code that check if user is logged in on launch is in CoreLayout
// Code for signing out is in (... Header?)
