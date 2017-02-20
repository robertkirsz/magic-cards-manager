import firebase from 'firebase'
import _forEach from 'lodash/forEach'

// Firebase configuration
const config = {
  apiKey: 'AIzaSyDwDacwAuGy4LxSOJnJKgVDOBSgHQm6PgU',
  authDomain: 'mtg-collection-cd492.firebaseapp.com',
  databaseURL: 'https://mtg-collection-cd492.firebaseio.com',
  storageBucket: 'mtg-collection-cd492.appspot.com',
  messagingSenderId: '378575387948'
}

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

// ---------- GENERIC STUFF ----------

// Generic 'get' function
export const firebaseGetData = (table, id) => (
  database
    .ref(table)
    .child(id)
    .once('value')
    .then(snapshot => {
      const data = snapshot.val()
      return data
        ? ({ success: true, data })
        : ({ error: 'No data found' })
    })
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

// Generic 'push' function
export const firebasePushData = (table, data) => (
  database
    .ref(table)
    .push()
    .set(data)
    .then(() => ({ success: true }))
    .catch(response => ({ error: response.message }))
)

// Generic 'update' function
export const firebaseUpdateData = (table, id, data) => (
  database
    .ref(table)
    .child(id)
    .update(data)
    .then(() => ({ success: true }))
    .catch(response => ({ error: response.message }))
)

// ---------- AUTHENTICATION ----------

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
    .then(response => ({ success: true, user: response.user }))
    .catch(response => ({ error: response.message }))
)

// ---------- PROFILE ----------

export const updateProfile = userProfile => (
  auth.currentUser.updateProfile({
    displayName: userProfile.displayName,
    photoURL: userProfile.photoURL
  }).then(function () {
    // Update successful.
  }, function (error) {
    // An error happened.
  })
)

// ---------- USER DATA UPDATING ----------

export const updateUserData = user => firebaseUpdateData('Users', user.uid, user)

export const saveCollection = collection => {
  const reducedCollection = {}
  _forEach(collection, singleCard => { reducedCollection[singleCard.id] = singleCard.formatForFirebase() })
  return firebaseSetData('Collections', auth.currentUser.uid, reducedCollection)
}

export const loadCollection = () => {
  return firebaseGetData('Collections', auth.currentUser.uid)
}
