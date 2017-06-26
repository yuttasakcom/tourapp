import { notify } from '../helper'

export const onDeleteRelationship = async (socket, _id) => {
  notify(socket, 'deleteRelationship', _id)
}
