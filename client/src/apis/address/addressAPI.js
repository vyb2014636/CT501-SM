import axiosIntercept from '@/apis/axiosIntercept'

export const fetchAddress = async () => {
  const response = await axiosIntercept.get('address/')
  return response
}
