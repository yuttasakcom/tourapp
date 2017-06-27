import { notify } from '../helper'

export const onRejectRequest = async (socket, _id) => {
  notify(socket, 'rejectRequest', _id)
}
