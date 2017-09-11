import { error } from 'react-notification-system-redux'
import jwtDecode from 'jwt-decode'

import axios from './axios'

import {
  AGENT_SIGN_IN_SUCCESS,
  AGENT_SIGN_OUT_SUCCESS,
  AGENT_SIGN_UP_SUCCESS,
  AGENT_TOGGLE_PROFILE_MENU
} from './types'

export const toggleProfileMenu = () => {
  return { type: AGENT_TOGGLE_PROFILE_MENU }
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
    dispatch({ type: AGENT_SIGN_IN_SUCCESS, payload: user })
  } catch (e) {
    dispatch(
      error({
        title: 'แจ้งเตือน',
        message: e.response.data
      })
    )
  }
}

export const signOut = () => {
  localStorage.clear()
  axios.defaults.headers.common['Authorization'] = ''
  return { type: AGENT_SIGN_OUT_SUCCESS }
}

export const signUp = values => async dispatch => {
  try {
    const { data: { token } } = await axios.post('/signup', values)
    const user = initAuth(token)
    dispatch({ type: AGENT_SIGN_UP_SUCCESS, payload: user })
  } catch (e) {
    dispatch(
      error({
        title: 'แจ้งเตือน',
        message: e.response.data.error
      })
    )
  }
}
