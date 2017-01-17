import { auth, googleProvider, facebookProvider } from 'utils/firebase'

// ------------------------------------
// Constants
// ------------------------------------
const SIGN_IN_REQUEST  = 'SIGN_IN_REQUEST'
const SIGN_IN_SUCCESS  = 'SIGN_IN_SUCCESS'
const SIGN_IN_ERROR    = 'SIGN_IN_ERROR'
const SIGN_UP_REQUEST  = 'SIGN_UP_REQUEST'
const SIGN_UP_SUCCESS  = 'SIGN_UP_SUCCESS'
const SIGN_UP_ERROR    = 'SIGN_UP_ERROR'
const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST'
const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS'
const SIGN_OUT_ERROR   = 'SIGN_OUT_ERROR'
const CLEAR_ERRORS     = 'CLEAR_ERRORS'

// ------------------------------------
// Actions
// ------------------------------------
export const signIn = (credentials) => {
  return (dispatch, getState) => {
    // Return if request is pending
    if (getState().user.signingIn) return
    // Dispatch action so we can show spinner
    dispatch(signInRequest())

    const { email, password } = credentials

    auth.signInWithEmailAndPassword(email, password)
      .catch(({ message }) => dispatch(signInError(message)))
  }
}
export const signInWithGoogle = () => {
  return (dispatch, getState) => {
    // Return if request is pending
    if (getState().user.signingIn) return
    // Dispatch action so we can show spinner
    dispatch(signInRequest())

    auth.signInWithPopup(googleProvider).then((result) => {
      console.info('signInWithPopup', result)
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken
      // The signed-in user info.
      const user = result.user
      console.info('token', token, 'user', user)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.email
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential
      // ...
      console.info('ERROR', 'errorCode', errorCode, 'errorMessage', errorMessage, 'email', email, 'credential', credential) // eslint-disable-line
      dispatch(signInError(errorMessage))
    })
  }
}
export const signInWithFacebook = () => {
  return (dispatch, getState) => {
    // Return if request is pending
    if (getState().user.signingIn) return
    // Dispatch action so we can show spinner
    dispatch(signInRequest())

    auth.signInWithPopup(facebookProvider).then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const token = result.credential.accessToken
      // The signed-in user info.
      const user = result.user
      // ...
      console.info('token', token, 'user', user)
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.email
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential
      // ...
      console.info('ERROR', 'errorCode', errorCode, 'errorMessage', errorMessage, 'email', email, 'credential', credential) // eslint-disable-line
      dispatch(signInError(errorMessage))
    })
  }
}

export const signInRequest = () => ({ type: SIGN_IN_REQUEST })
export const signInSuccess = user => ({ type: SIGN_IN_SUCCESS, user })
export const signInError   = errorMessage => ({ type: SIGN_IN_ERROR, errorMessage })

export const signUp = (credentials) => {
  return (dispatch, getState) => {
    // Return if request is pending
    if (getState().user.signingUp) return
    // Dispatch action so we can show spinner
    dispatch(signUpRequest())

    const { email, password } = credentials

    auth.createUserWithEmailAndPassword(email, password)
      .catch(({ message }) => dispatch(signUpError(message)))
  }
}

export const signUpRequest = () => ({ type: SIGN_UP_REQUEST })
export const signUpSuccess = user => ({ type: SIGN_UP_SUCCESS, user })
export const signUpError   = errorMessage => ({ type: SIGN_UP_ERROR, errorMessage })

export const signOut = () => {
  return (dispatch, getState) => {
    // Return if request is pending
    if (getState().user.signingOut) return
    // Dispatch action so we can show spinner
    dispatch(signOutRequest())
    auth.signOut().then(() => {
      dispatch(signOutSuccess())
    }, (error) => {
      dispatch(signOutError(error))
    })
  }
}

export const signOutRequest = () => ({ type: SIGN_OUT_REQUEST })
export const signOutSuccess = () => ({ type: SIGN_OUT_SUCCESS })
export const signOutError   = errorMessage => ({ type: SIGN_OUT_ERROR, errorMessage })

export const clearErrors = () => ({ type: CLEAR_ERRORS })

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SIGN_IN_REQUEST]:  state => ({ ...state, signingIn: true, errorMessage: null }),
  [SIGN_IN_SUCCESS]:  (state, { user }) => ({ ...state, ...user, signingIn: false, loggedIn: true }),
  [SIGN_IN_ERROR]:    (state, { errorMessage }) => ({ ...state, signingIn: false, errorMessage }),
  [SIGN_OUT_REQUEST]: state => ({ ...state, signingOut: true, errorMessage: null }),
  [SIGN_OUT_SUCCESS]: (state, { user }) => ({ ...state, ...user, signingOut: false, loggedIn: false }),
  [SIGN_OUT_ERROR]:   (state, { errorMessage }) => ({ ...state, signingOut: false, errorMessage }),
  [SIGN_UP_REQUEST]:  state => ({ ...state, signingUp: true, errorMessage: null }),
  [SIGN_UP_SUCCESS]:  (state, { user }) => ({ ...state, ...user, signingUp: false, loggedIn: true }),
  [SIGN_UP_ERROR]:    (state, { errorMessage }) => ({ ...state, signingUp: false, errorMessage }),
  [CLEAR_ERRORS]:     state => ({ ...state, errorMessage: null })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  signingIn: false,
  signingUp: false,
  signingOut: false,
  loggedIn: false,
  errorMessage: null,
  name: '',
  email: '',
  picture: ''
}

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
