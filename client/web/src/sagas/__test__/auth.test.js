import { take, put, call } from 'redux-saga/effects'
import cookie from 'js-cookie'

import { signOut } from '../auth'
import { SIGN_OUT, SIGN_OUT_SUCCESS } from '../../actions/types'

describe('signOut', () => {
  const gen = signOut()

  it('take sign_out', () => {
    expect(gen.next().value).toEqual(take(SIGN_OUT))
  })

  it('remove cookie', () => {
    expect(gen.next().value).toEqual(call(cookie.remove, 'jwt'))
  })

  it('put sign_out_success', () => {
    expect(gen.next().value).toEqual(put({ type: SIGN_OUT_SUCCESS }))
  })
})
