import { firebaseSignIn, firebaseSignUp, firebaseSignOut, firebaseProviderSignIn, updateUserData } from 'utils/firebase'
import { openModal } from 'store/layout'

// ------------------------------------
// Constants
// ------------------------------------
const AUTH_REQUEST = 'AUTH_REQUEST'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const AUTH_ERROR = 'AUTH_ERROR'
const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS'
const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR'

// ------------------------------------
// Actions
// ------------------------------------

export const signIn = ({ email, password }) => {
  return async (dispatch, getState) => {
    // Return if request is pending
    if (getState().user.authPending) return
    // Dispatch action so we can show spinner
    dispatch(authRequest())
    // Sign the user in in Firebase
    const firebaseSignInResponse = await firebaseSignIn(email, password)
    // If we got error, display it
    if (firebaseSignInResponse.error) dispatch(authError(firebaseSignInResponse.error))
  }
}
export const signUp = ({ email, password }) => {
  return async (dispatch, getState) => {
    // Return if request is pending
    if (getState().user.authPending) return
    // Dispatch action so we can show spinner
    dispatch(authRequest())
    // Sign the user up in Firebase
    const firebaseSignUpResponse = await firebaseSignUp(email, password)
    // If we got error, display it
    if (firebaseSignUpResponse.error) dispatch(authError(firebaseSignUpResponse.error))
  }
}
export const signOut = () => {
  return async (dispatch, getState) => {
    // Return if request is pending
    if (getState().user.authPending) return
    // Dispatch action so we can show spinner
    dispatch(authRequest())
    // Sign user out of Firebase
    const firebaseSignOutResponse = await firebaseSignOut()
    // Display errors if we get any
    if (firebaseSignOutResponse.error) dispatch(openModal('error', { message: `There was a problem with signing out. This is what we know: ${firebaseSignOutResponse.error}` }))
    else dispatch(signOutSuccess())
  }
}
export const signInWithProvider = (providerName) => {
  return async (dispatch, getState) => {
    // Return if request is pending
    if (getState().user.authPending) return
    // Dispatch action so we can show spinner
    dispatch(authRequest())
    // Sign in via provider
    const firebaseSignInResponse = await firebaseProviderSignIn(providerName)
    // Display errors if we get any
    if (firebaseSignInResponse.error) dispatch(authError(firebaseSignInResponse.error))
  }
}

export const authRequest = () => ({ type: AUTH_REQUEST })
export const authSuccess = user => ({ type: AUTH_SUCCESS, user }) // TODO: sprawdzić czy createdOn już istnieje
export const authError = error => ({ type: AUTH_ERROR, error })
export const signOutSuccess = () => ({ type: SIGN_OUT_SUCCESS })
export const clearAuthErrors = () => ({ type: CLEAR_AUTH_ERROR })

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [AUTH_REQUEST]: state => ({ ...state, authPending: true, error: null }),
  [AUTH_SUCCESS]: (state, { user }) => {
    updateUserData(user)
    return { ...state, ...user, authPending: false, signedIn: true }
  },
  [AUTH_ERROR]: (state, { error }) => ({ ...state, authPending: false, error }),
  [SIGN_OUT_SUCCESS]: () => initialState,
  [CLEAR_AUTH_ERROR]: state => ({ ...state, error: null })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  authPending: false,
  signedIn: false,
  error: null,
  name: '',
  email: '',
  picture: ''
}

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
