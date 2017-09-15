let apiBaseUrl = 'https://api.tourapp'
if (window.location.href.indexOf('localhost') > -1) {
  apiBaseUrl = 'https://localhost:4000'
}
apiBaseUrl = 'https://localhost:4000'
export const API_BASE_URL = apiBaseUrl
