import district from '~/models/district'
import province from '~/models/province'
import ward from '~/models/ward'

const getAddresses = async () => {
  const provinces = await province.find().lean()
  const addresses = await Promise.all(
    provinces.map(async (province) => {
      const districts = await district.find({ province: province._id }).lean()

      const districtsWithWards = await Promise.all(
        districts.map(async (district) => {
          const wards = await ward.find({ district: district._id }).lean()
          return {
            ...district,
            wards
          }
        })
      )

      return {
        ...province,
        districts: districtsWithWards
      }
    })
  )
  return addresses
}

export const addressService = {
  getAddresses
}
