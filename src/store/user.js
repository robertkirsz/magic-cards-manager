import { firebaseSignIn, firebaseSignUp, firebaseSignOut, firebaseProviderSignIn, setUserData } from 'utils/firebase'
import { openModal } from 'store/layout'

// ------------------------------------
// Constants
// ------------------------------------
const SIGN_IN_REQUEST   = 'SIGN_IN_REQUEST'
const SIGN_IN_SUCCESS   = 'SIGN_IN_SUCCESS'
const SIGN_UP_REQUEST   = 'SIGN_UP_REQUEST'
const SIGN_UP_SUCCESS   = 'SIGN_UP_SUCCESS'
const SIGN_UP_ERROR     = 'SIGN_UP_ERROR'
const SIGN_OUT_REQUEST  = 'SIGN_OUT_REQUEST'
const SIGN_OUT_SUCCESS  = 'SIGN_OUT_SUCCESS'
const SHOW_AUTH_ERROR   = 'SHOW_AUTH_ERROR'
const CLEAR_AUTH_ERRORR = 'CLEAR_AUTH_ERRORR'

// ------------------------------------
// Actions
// ------------------------------------

// TODO: replace 'signInRequest' and 'signUpRequest' with 'authRequest'
// TODO: replace 'signInSuccess' and 'signUpSuccess' with 'authSuccess'

export const signIn = ({ email, password }) => {
  return async (dispatch, getState) => {
    // Return if request is pending
    if (getState().user.signingIn) return
    // Dispatch action so we can show spinner
    dispatch(signInRequest())
    // Sign the user in in Firebase
    const firebaseSignInResponse = await firebaseSignIn(email, password)
    // If we got error, display it
    if (firebaseSignInResponse.error) dispatch(showAuthError(firebaseSignInResponse.error))
  }
}
export const signInRequest = () => ({ type: SIGN_IN_REQUEST })
export const signInSuccess = user => ({ type: SIGN_IN_SUCCESS, user })

export const signUp = ({ email, password }) => {
  return async (dispatch, getState) => {
    // Return if request is pending
    if (getState().user.signingUp) return
    // Dispatch action so we can show spinner
    dispatch(signUpRequest())
    // Sign the user up in Firebase and get his ID or error
    const firebaseSignUpResponse = await firebaseSignUp(email, password)
    // If we got error, display it and return
    if (firebaseSignUpResponse.error) {
      dispatch(showAuthError(firebaseSignUpResponse.error.message))
      return
    }
    // If we got ID, gather user's data and save it in Firebase
    const setUserDataResponse = await setUserData({ id: firebaseSignUpResponse.id, email, createdOn: Date.now() })
    // If we got error back, display it on page
    if (setUserDataResponse.error) dispatch(openModal('error', { message: `Your account has been created, but there was a problem with saving your data in the database. This is what we know: ${setUserDataResponse.error}` }))
  }
}
export const signUpRequest = () => ({ type: SIGN_UP_REQUEST })
export const signUpSuccess = user => ({ type: SIGN_UP_SUCCESS, user })

export const signOut = () => {
  return async (dispatch, getState) => {
    // Return if request is pending
    if (getState().user.signingOut) return
    // Dispatch action so we can show spinner
    dispatch(signOutRequest())
    // Sign user out of Firebase
    const firebaseSignOutResponse = await firebaseSignOut()
    // Display errors if we get any
    if (firebaseSignOutResponse.error) dispatch(openModal('error', { message: `There was a problem whith logging out. This is what we know: ${firebaseSignOutResponse.error}` }))
    else dispatch(signOutSuccess())
  }
}
export const signOutRequest = () => ({ type: SIGN_OUT_REQUEST })
export const signOutSuccess = () => ({ type: SIGN_OUT_SUCCESS })

export const signInWithProvider = (providerName) => {
  return (dispatch, getState) => {
    // Return if request is pending
    if (getState().user.signingIn) return
    // Dispatch action so we can show spinner
    dispatch(signInRequest())
    // Sign in
    firebaseProviderSignIn(providerName)
      .catch(error => dispatch(showAuthError(error.message)))
  }
}

export const showAuthError = errorMessage => ({ type: SHOW_AUTH_ERROR, errorMessage })
export const clearErrors = () => ({ type: CLEAR_AUTH_ERRORR })

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SIGN_IN_REQUEST]: state => ({ ...state, signingIn: true, errorMessage: null }),
  [SIGN_IN_SUCCESS]: (state, { user }) => ({ ...state, ...user, signingIn: false, loggedIn: true }),
  [SIGN_UP_REQUEST]: state => ({ ...state, signingUp: true, errorMessage: null }),
  [SIGN_UP_SUCCESS]: (state, { user }) => ({ ...state, ...user, signingUp: false, loggedIn: true }),
  [SIGN_UP_ERROR]: (state, { errorMessage }) => ({ ...state, signingUp: false, errorMessage }),
  [SIGN_OUT_REQUEST]: state => ({ ...state, signingOut: true, errorMessage: null }),
  [SIGN_OUT_SUCCESS]: () => initialState,
  [SHOW_AUTH_ERROR]: (state, { errorMessage }) => ({ ...state, signingIn: false, signingUp: false, signingOut: false, errorMessage }),
  [CLEAR_AUTH_ERRORR]: state => ({ ...state, errorMessage: null })
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
