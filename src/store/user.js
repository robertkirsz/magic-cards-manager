// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_REQUEST  = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS  = 'LOGIN_SUCCESS'
export const LOGIN_ERROR    = 'LOGIN_ERROR'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_ERROR   = 'LOGOUT_ERROR'

// ------------------------------------
// Actions
// ------------------------------------
export const loginRequest  = () => ({ type: LOGIN_REQUEST })
export const loginSuccess  = (user) => ({ type: LOGIN_SUCCESS, user })
export const loginError    = () => ({ type: LOGIN_ERROR })
export const logoutRequest = () => ({ type: LOGOUT_REQUEST })
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS })
export const logoutError   = () => ({ type: LOGOUT_ERROR })

export const actions = {
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_REQUEST]: (state, action) => {
    return { ...state, loggingIn: true, loggedIn: false }
  },
  [LOGIN_SUCCESS]: (state, { user }) => {
    return { ...state, ...user, loggingIn: false, loggedIn: true }
  },
  [LOGIN_ERROR]: (state, action) => {
    return { ...state, loggingIn: false, loggedIn: false }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loggingIn: false,
  loggedIn: false,
  name: '',
  email: '',
  picture: ''
}

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
