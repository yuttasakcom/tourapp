import axios from './axios'
import { FETCH_BOOKINGS_DASHBOARD_SUCCESS } from './types'

export const fetchBookingsDashboard = (
  dateStart,
  dateEnd
) => async dispatch => {
  try {
    const { data } = await axios.get(
      `/bookings?dateStart=${dateStart}&dateEnd=${dateEnd}`
    )
    dispatch({
      type: FETCH_BOOKINGS_DASHBOARD_SUCCESS,
      payload: data
    })
  } catch (e) {
    console.error(e)
  }
}
