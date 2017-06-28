import { notify } from '../helper'

export const onBook = async (socket, data) => {
  notify(socket, 'book', data)
}
