import axiosIntercept from '@/apis/axiosIntercept'

export const statisticAPI = async () => {
  const response = await axiosIntercept.get(`statistic`)
  return response
}
export const getStatisticsDetailsAPI = async (type, month, year) => {
  const response = await axiosIntercept.get('statistic/details', { params: { type, month, year } })
  return response
}
