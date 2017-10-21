import { error } from 'react-notification-system-redux'
import { take, put, call } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import jwtDecode from 'jwt-decode'
import cookie from 'js-cookie'
import axios from 'axios'

import { signOut } from '../auth'
import auth from '../auth'
import {
  SIGN_IN,
  SIGN_UP,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SIGN_OUT_SUCCESS
} from '../../actions/types'

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

describe('auth', () => {
  const data = {}

  beforeAll(() => {
    data.signIn = cloneableGenerator(auth)()
  })

  it('take sign_in, sign_up, sign_in_success', () => {
    expect(data.signIn.next().value).toEqual(
      take([SIGN_IN, SIGN_UP, SIGN_IN_SUCCESS])
    )
    data.signUp = data.signIn.clone()
    data.signInSuccess = data.signIn.clone()
  })

  describe('sign in success firt time', () => {
    it('sign_in_success must be take sign_out', () => {
      expect(data.signInSuccess.next({ type: SIGN_IN_SUCCESS }).value).toEqual(
        call(signOut)
      )
    })

    it('take auth again', () => {
      expect(data.signInSuccess.next().value).toEqual(
        take([SIGN_IN, SIGN_UP, SIGN_IN_SUCCESS])
      )
    })
  })

  describe('signIn', () => {
    it('sign_in must be call correct signin api', () => {
      const action = {
        type: SIGN_IN,
        payload: {
          role: 'company',
          values: { username: 'test' }
        }
      }
      expect(data.signIn.next(action).value).toEqual(
        call(axios.post, `/api/companies/signin`, {
          ...action.payload.values,
          role: action.payload.role
        })
      )
    })

    it('signin api success must be call jwtDecode with token', () => {
      const res = {
        data: {
          token: 'token'
        }
      }
      expect(data.signIn.next(res).value).toEqual(
        call(jwtDecode, res.data.token)
      )
    })

    it('put sign_in_success with user object and call signOut', () => {
      const user = {
        name: 'paiboon'
      }
      expect(data.signIn.next(user).value).toEqual(
        put({ type: SIGN_IN_SUCCESS, payload: user })
      )
    })

    it('take sign_out', () => {
      expect(data.signIn.next().value).toEqual(call(signOut))
    })

    it('take auth again', () => {
      expect(data.signIn.next().value).toEqual(
        take([SIGN_IN, SIGN_UP, SIGN_IN_SUCCESS])
      )
    })
  })

  describe('signUp', () => {
    it('sign_up must be call correct signup api', () => {
      const action = {
        type: SIGN_UP,
        payload: {
          role: 'agent',
          values: { username: 'test' }
        }
      }
      expect(data.signUp.next(action).value).toEqual(
        call(axios.post, `/api/agents/signup`, {
          ...action.payload.values,
          role: action.payload.role
        })
      )
    })

    it('api throw error must put error notification', () => {
      expect(data.signUp.throw({ response: { data: 'error' } }).value).toEqual(
        put(error({ title: 'แจ้งเตือน', message: 'error' }))
      )
    })

    it('take auth again', () => {
      expect(data.signUp.next().value).toEqual(
        take([SIGN_IN, SIGN_UP, SIGN_IN_SUCCESS])
      )
    })
  })
})
