import { error } from 'react-notification-system-redux'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import cookie from 'js-cookie'
import { take, call, put } from 'redux-saga/effects'

import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from '../actions/types'

export function* signOut() {
  yield take(SIGN_OUT)
  yield call(cookie.remove, 'jwt')
  yield put({ type: SIGN_OUT_SUCCESS })
}

export default function* auth() {
  while (true) {
    const { type, payload: { role, values } } = yield take([
      SIGN_IN,
      SIGN_UP,
      SIGN_IN_SUCCESS
    ])

    if (type !== SIGN_IN_SUCCESS) {
      try {
        const { data: { token } } = yield call(
          axios.post,
          `/api/${role === 'company' ? 'companies' : 'agents'}/${type ===
          SIGN_IN
            ? 'signin'
            : 'signup'}`,
          {
            ...values,
            role
          }
        )
        const user = yield call(jwtDecode, token)
        yield put({ type: SIGN_IN_SUCCESS, payload: user })
        yield signOut()
      } catch (e) {
        yield put(
          error({
            title: 'แจ้งเตือน',
            message: e.response.data
          })
        )
      }
    } else {
      yield signOut()
    }
  }
}
