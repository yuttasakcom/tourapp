import { notify } from '../helper'

export const onRequest = async (socket, _id) => {
  notify(socket, 'request', _id)
}
