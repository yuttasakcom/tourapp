import { delay } from 'lodash'
import jwtDecode from 'jwt-decode'

import axios from './axios'

import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_UP_FAIL,
  HIDE_AUTH_NOTIFICATION,
  TOGGLE_PROFILE_MENU
} from './types'

export const toggleProfileMenu = () => {
  return { type: TOGGLE_PROFILE_MENU }
}

const initAuth = token => {
  const user = jwtDecode(token)
  localStorage.setItem('token', token)
  axios.defaults.headers.common['Authorization'] = token
  return user
}

export const signIn = values => async dispatch => {
  try {
    const { data: { token } } = await axios.post('/signin', {
      ...values,
      role: 'agent'
    })
    const user = initAuth(token)
    dispatch({ type: SIGN_IN_SUCCESS, payload: user })
  } catch (e) {
    dispatch({
      type: SIGN_IN_FAIL,
      payload: e.response.data
    })
    delay(() => dispatch({ type: HIDE_AUTH_NOTIFICATION }), 4000)
  }
}

export const signOut = () => {
  localStorage.clear()
  axios.defaults.headers.common['Authorization'] = ''
  return { type: SIGN_OUT_SUCCESS }
}

export const signUp = values => async dispatch => {
  try {
    const { data: { token } } = await axios.post('/signup', values)
    const user = initAuth(token)
    dispatch({ type: SIGN_UP_SUCCESS, payload: user })
  } catch (e) {
    dispatch({
      type: SIGN_UP_FAIL,
      payload: e.response.data.error
    })
    delay(() => dispatch({ type: HIDE_AUTH_NOTIFICATION }), 4000)
  }
}
