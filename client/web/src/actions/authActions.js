import { error } from 'react-notification-system-redux'
import jwtDecode from 'jwt-decode'

import axiosAgent from './agents/axios'
import axiosCompany from './companies/axios'

import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, SIGN_UP_SUCCESS } from './types'

export const signIn = (role, values) => async dispatch => {
  let axios
  if (role === 'company') {
    axios = axiosCompany
  } else {
    axios = axiosAgent
  }
  try {
    const { data: { token } } = await axios.post('/signin', {
      ...values,
      role
    })
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
  document.cookie = 'jwt=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  return { type: SIGN_OUT_SUCCESS }
}

export const signUp = (role, values) => async dispatch => {
  let axios
  if (role === 'company') {
    axios = axiosCompany
  } else {
    axios = axiosAgent
  }
  try {
    const { data: { token } } = await axios.post('/signup', values)
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
