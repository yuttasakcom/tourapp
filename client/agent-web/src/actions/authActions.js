import _ from 'lodash'
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

export const signIn = values => async dispatch => {
  try {
    const { data: { token, _id } } = await axios.post('/signin', {
      ...values,
      role: 'agent'
    })
    localStorage.setItem('token', token)
    localStorage.setItem('_id', _id)
    axios.defaults.headers.common['Authorization'] = token
    dispatch({ type: SIGN_IN_SUCCESS, payload: _id })
  } catch (e) {
    dispatch({
      type: SIGN_IN_FAIL,
      payload: e.response.data
    })
    _.delay(() => dispatch({ type: HIDE_AUTH_NOTIFICATION }), 4000)
  }
}

export const signOut = () => {
  localStorage.clear()
  axios.defaults.headers.common['Authorization'] = ''
  return { type: SIGN_OUT_SUCCESS }
}

export const signUp = values => async dispatch => {
  try {
    const { data: { token, _id } } = await axios.post('/signup', values)
    localStorage.setItem('token', token)
    localStorage.setItem('_id', _id)
    dispatch({ type: SIGN_UP_SUCCESS, payload: _id })
  } catch (e) {
    dispatch({
      type: SIGN_UP_FAIL,
      payload: e.response.data.error
    })
    _.delay(() => dispatch({ type: HIDE_AUTH_NOTIFICATION }), 4000)
  }
}