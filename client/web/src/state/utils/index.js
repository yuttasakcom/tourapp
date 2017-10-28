import axiosCompanies from './axiosCompanies'
import axiosAgents from './axiosAgents'

const openPDF = data => {
  const blob = new Blob([data], {
    type: 'application/pdf'
  })

  const url = window.URL.createObjectURL(blob)
  window.open(url)
}

export const openCompanyReport = async reportName => {
  const { data } = await axiosCompanies.get(`/reports/${reportName}`, {
    responseType: 'arraybuffer'
  })
  openPDF(data)
}

export const openAgentReport = async reportName => {
  const { data } = await axiosAgents.get(`/reports/${reportName}`, {
    responseType: 'arraybuffer'
  })
  openPDF(data)
}
