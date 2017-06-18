import _ from 'lodash'
import axios from './axios'

import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_UP_FAIL,
  HIDE_AUTH_NOTIFICATION
} from './types'

export const signIn = values => async dispatch => {
  try {
    const { data: { token } } = await axios.post('/signin', {
      ...values,
      role: 'company'
    })
    localStorage.setItem('token', token)
    axios.defaults.headers.common['Authorization'] = token
    dispatch({ type: SIGN_IN_SUCCESS })
  } catch (e) {
    dispatch({
      type: SIGN_IN_FAIL,
      payload: { type: 'danger', message: e.response.data }
    })
    _.delay(() => dispatch({ type: HIDE_AUTH_NOTIFICATION }), 4000)
  }
}

export const signOut = () => {
  localStorage.removeItem('token')
  axios.defaults.headers.common['Authorization'] = ''
  return { type: SIGN_OUT_SUCCESS }
}

export const signUp = values => async dispatch => {
  try {
    const { data: { token } } = await axios.post('/signup', values)
    localStorage.setItem('token', token)
    dispatch({ type: SIGN_UP_SUCCESS })
  } catch (e) {
    dispatch({
      type: SIGN_UP_FAIL,
      payload: { type: 'danger', message: e.response.data.error }
    })
    _.delay(() => dispatch({ type: HIDE_AUTH_NOTIFICATION }), 4000)
  }
}
