import { addressService } from '~/services/addressService'

const getAddresses = async (req, res, next) => {
  try {
    const addresses = await addressService.getAddresses()

    res.status(200).json({
      message: 'Danh sách toàn bộ địa chỉ',
      addresses
    })
  } catch (error) {
    next(error)
  }
}

export const addressController = {
  getAddresses
}
