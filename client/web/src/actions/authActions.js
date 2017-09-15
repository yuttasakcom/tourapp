import { error } from 'react-notification-system-redux'
import jwtDecode from 'jwt-decode'

import axiosAgent from './agents/axios'
import axiosCompany from './companies/axios'

import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, SIGN_UP_SUCCESS } from './types'

const initAuth = token => {
  const user = jwtDecode(token)
  let axios
  if (user.role === 'company') {
    axios = axiosCompany
  } else {
    axios = axiosAgent
  }
  localStorage.setItem('token', token)
  axios.defaults.headers.common['Authorization'] = token
  return user
}

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
  axiosAgent.defaults.headers.common['Authorization'] = ''
  axiosCompany.defaults.headers.common['Authorization'] = ''
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
