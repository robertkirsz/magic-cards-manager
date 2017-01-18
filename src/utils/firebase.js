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
export const twitterProvider  = new firebase.auth.TwitterAuthProvider()
export const gitHubProvider   = new firebase.auth.GithubAuthProvider()

export const firebaseSignIn = (email, password) => (
  auth
    .signInWithEmailAndPassword(email, password)
    .then(response => ({ success: true, id: response.uid, response }))
    .catch(response => ({ error: response.message, response }))
)

export const firebaseSignUp = (email, password) => (
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(response => ({ success: true, id: response.uid }))
    .catch(response => ({ error: response.message }))
)

export const setUserData = (data) => (
  database
    .ref('Users')
    .child(data.id)
    .set(data)
    .then(() => ({ success: true }))
    .catch(response => ({ error: response.message }))
)

export const googleSignIn = () => (
  new Promise((resolve, reject) => {
    auth.signInWithPopup(googleProvider)
      .then(result => {
        const token = result.credential.accessToken
        const user = result.user
        console.info('signInWithPopup', result, 'token', token, 'user', user)
        resolve()
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.email
        const credential = error.credential
        console.error('ERROR', 'errorCode', errorCode, 'errorMessage', errorMessage, 'email', email, 'credential', credential) // eslint-disable-line
        reject(errorMessage)
      })
  })
)

// LOGIN
// Code that check if user is logged in on launch is in CoreLayout
// Code for signing out is in (... Header?)
