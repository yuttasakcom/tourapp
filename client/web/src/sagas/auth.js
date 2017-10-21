import { error } from 'react-notification-system-redux'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import cookie from 'js-cookie'
import { take, fork, call, put } from 'redux-saga/effects'

import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from '../actions/types'

function* authorize({ type, role, values }) {
  try {
    const { data: { token } } = yield call(
      axios.post,
      `/api/${role === 'company' ? 'companies' : 'agents'}/${type === SIGN_IN
        ? 'signin'
        : 'signup'}`,
      {
        ...values,
        role
      }
    )
    const user = jwtDecode(token)
    yield put({ type: SIGN_IN_SUCCESS, payload: user })
  } catch (e) {
    yield put(
      error({
        title: 'แจ้งเตือน',
        message: e.response.data
      })
    )
  }
}

export default function* auth() {
  while (true) {
    const action = yield take([SIGN_IN, SIGN_UP, SIGN_IN_SUCCESS])
    action.type === SIGN_IN_SUCCESS
      ? yield put({ type: SIGN_IN_SUCCESS, payload: action.payload })
      : yield fork(authorize, action)
    yield take(SIGN_OUT)
    yield call(cookie.remove, 'jwt')
    yield put({ type: SIGN_OUT_SUCCESS })
  }
}
