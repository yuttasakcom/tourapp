import { notify } from '../helper'

export const onCancelRequest = async (socket, _id) => {
  notify(socket, 'cancelRequest', _id)
}
