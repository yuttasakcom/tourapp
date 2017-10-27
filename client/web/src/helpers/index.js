import axiosAgent from '../actions/agents/axios'

const openPDF = data => {
  const blob = new Blob([data], {
    type: 'application/pdf'
  })

  const url = window.URL.createObjectURL(blob)
  window.open(url)
}

export const openAgentReport = async reportName => {
  const { data } = await axiosAgent.get(`/reports/${reportName}`, {
    responseType: 'arraybuffer'
  })
  openPDF(data)
}
