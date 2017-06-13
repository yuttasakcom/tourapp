import axios from './axios'

import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, SIGN_UP_SUCCESS } from './types'

export const signIn = values => async dispatch => {
  const { data: { token } } = await axios.post('/companies/signin', {
    ...values,
    role: 'company'
  })
  localStorage.setItem('token', token)
  dispatch({ type: SIGN_IN_SUCCESS })
}

export const signOut = () => {
  localStorage.removeItem('token')
  return { type: SIGN_OUT_SUCCESS }
}

export const signUp = values => async dispatch => {
  const { data: { token } } = await axios.post('/companies/signup', values)
  localStorage.setItem('token', token)
  return { type: SIGN_UP_SUCCESS }
}
