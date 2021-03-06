import { error } from 'react-notification-system-redux'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import cookie from 'js-cookie'
import { take, call, put } from 'redux-saga/effects'

import actions from '../actions'
import { SIGN_IN, SIGN_OUT, SIGN_UP, SIGN_IN_SUCCESS } from './types'

export function* signOut() {
  yield take(SIGN_OUT)
  yield call(cookie.remove, 'jwt')
  yield put(actions.common.auth.signOutSuccess())
}

export default function* auth() {
  while (true) {
    const action = yield take([SIGN_IN, SIGN_UP, SIGN_IN_SUCCESS])
    if (action.type !== SIGN_IN_SUCCESS) {
      const { type, payload: { role, values } } = action
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
        yield put(actions.common.auth.signInSuccess(user))
        yield call(signOut)
      } catch (e) {
        yield put(
          error({
            title: 'แจ้งเตือน',
            message: e.response.data
          })
        )
      }
    } else {
      yield call(signOut)
    }
  }
}
