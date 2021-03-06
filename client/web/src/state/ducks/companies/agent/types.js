const def = action => `COMPANY/AGENT/${action}`
export const FETCH_AGENTS = def('FETCH_AGENTS')
export const FETCH_AGENTS_SUCCESS = def('FETCH_AGENTS_SUCCESS')
export const FETCH_AGENT_CONTRACT_RATES = def('FETCH_AGENT_CONTRACT_RATES')
export const FETCH_AGENT_CONTRACT_RATES_SUCCESS = def(
  'FETCH_AGENT_CONTRACT_RATES_SUCCESS'
)
export const REQUEST_AGENT = def('REQUEST_AGENT')
export const SELECT_AGENT = def('SELECT_AGENT')
export const SELECT_OFFER_SPECIAL_PRICE_PKG = def(
  'SELECT_OFFER_SPECIAL_PRICE_PKG'
)
export const OFFER_SPECIAL_PRICE = def('OFFER_SPECIAL_PRICE')
export const OFFER_SPECIAL_PRICE_SUCCESS = def('OFFER_SPECIAL_PRICE_SUCCESS')
export const RESET_PRICE = def('RESET_PRICE')
export const DELETE_AGENT = def('DELETE_AGENT')
export const DELETE_AGENT_SUCCESS = def('DELETE_AGENT_SUCCESS')
