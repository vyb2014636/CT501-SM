import axiosIntercept from '@/apis/axiosIntercept'

export const statisticAPI = async () => {
  const response = await axiosIntercept.get(`statistic`)
  return response
}
