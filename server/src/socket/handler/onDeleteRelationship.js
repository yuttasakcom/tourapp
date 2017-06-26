import { notify } from '../helper'

export const onAccept = async (socket, _id) => {
  notify(socket, 'deleteRelationship', _id)
}
