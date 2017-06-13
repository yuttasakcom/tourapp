import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, SIGN_UP_SUCCESS } from './types'

export const signIn = () => {
  return { type: SIGN_IN_SUCCESS }
}

export const signOut = () => {
  return { type: SIGN_OUT_SUCCESS }
}

export const signUp = () => {
  return { type: SIGN_UP_SUCCESS }
}
