import { SIGN_UP, SIGN_IN, SIGN_OUT } from './types'

export const signIn = (role, values) => ({ type: SIGN_IN, role, values })
export const signUp = (role, values) => ({ type: SIGN_UP, role, values })
export const signOut = () => ({ type: SIGN_OUT })
