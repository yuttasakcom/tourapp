import moment from 'moment'

import axios from './axios'

import { FETCH_BOOKINGS_SUMMARY_SUCCESS } from './types'

export const fetchBookingsSummary = date => async dispatch => {
  const dateEnd = moment(date).add(1, 'days')
  try {
    const { data } = await axios.get(
      `/bookings-summary?dateStart=${date}&dateEnd=${dateEnd}`
    )
    dispatch({ type: FETCH_BOOKINGS_SUMMARY_SUCCESS, payload: { data, date } })
  } catch (e) {
    console.error(e)
  }
}
