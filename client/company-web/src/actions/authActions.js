import { error } from 'react-notification-system-redux'
import jwtDecode from 'jwt-decode'

import axios from './companies/axios'

import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, SIGN_UP_SUCCESS } from './types'

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
      role: 'company'
    })
    const user = initAuth(token)
    dispatch({ type: SIGN_IN_SUCCESS, payload: user })
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
  return { type: SIGN_OUT_SUCCESS }
}

export const signUp = values => async dispatch => {
  try {
    const { data: { token } } = await axios.post('/signup', values)
    const user = initAuth(token)
    dispatch({ type: SIGN_UP_SUCCESS, payload: user })
  } catch (e) {
    dispatch(
      error({
        title: 'แจ้งเตือน',
        message: e.response.data.error
      })
    )
  }
}
