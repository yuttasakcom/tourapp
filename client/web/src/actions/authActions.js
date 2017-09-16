import { error } from 'react-notification-system-redux'
import jwtDecode from 'jwt-decode'
import cookie from 'js-cookie'
import axios from 'axios'

import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, SIGN_UP_SUCCESS } from './types'

export const signIn = (role, values) => async dispatch => {
  try {
    const { data: { token } } = await axios.post(
      `/api/${role === 'company' ? 'companies' : 'agents'}/signin`,
      {
        ...values,
        role
      }
    )
    const user = jwtDecode(token)
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
  cookie.remove('jwt')
  return { type: SIGN_OUT_SUCCESS }
}

export const signUp = (role, values) => async dispatch => {
  try {
    const { data: { token } } = await axios.post(
      `/api/${role === 'company' ? 'companies' : 'agents'}/signup`,
      values
    )
    const user = jwtDecode(token)
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
