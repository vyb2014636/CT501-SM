import Joi from 'joi'
import ApiError from '~/utils/ApiError'

const validRegister = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: true } })
      .required()
      .messages({
        'string.email': 'Địa chỉ email không hợp lệ.',
        'any.required': 'Địa chỉ email là bắt buộc.',
        'string.empty': 'Không được để rỗng'
      }),
    password: Joi.string()
      .min(8)
      .max(30)
      .pattern(new RegExp('(?=.*[a-z])'))
      .pattern(new RegExp('(?=.*[A-Z])'))
      .pattern(new RegExp('(?=.*[0-9])'))
      .pattern(new RegExp('(?=.*[!@#$%^&*])'))
      .messages({
        'string.empty': 'Không được để rỗng',
        'string.min': 'Mật khẩu phải có ít nhất 8 ký tự.',
        'string.max': 'Mật khẩu không được vượt quá 30 ký tự.',
        'string.pattern.base': 'Mật khẩu phải bao gồm chữ hoa, chữ thường, số, và ký tự đặc biệt.',
        'any.required': 'Mật khẩu là bắt buộc.'
      }),
    lastname: Joi.string().required().min(2).max(30).trim().strict().pattern(new RegExp('^[a-zA-Z]+$')).messages({
      'string.empty': 'Không được để rỗng',
      'string.min': 'Tên có ít nhất 2 ký tự',
      'any.required': 'Tên là bắt buộc.',
      'string.pattern.base': 'Tên không được có số'
    }),
    firstname: Joi.string().required().min(2).max(30).trim().strict().pattern(new RegExp('^[a-zA-Z]+$')).messages({
      'string.empty': 'Không được để rỗng',
      'string.min': 'Tên có ít nhất 2 ký tự',
      'any.required': 'Họ là bắt buộc.',
      'string.pattern.base': 'Tên không được có số'
    })
  })

  try {
    await correctCondition.validateAsync(req.body) // abortEarly trả về tất cả lỗi
    next()
  } catch (error) {
    next(new ApiError(500, error.message))
  }
}

const validLogin = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: true } })
      .required()
      .messages({
        'string.email': 'Địa chỉ email không hợp lệ.',
        'any.required': 'Địa chỉ email là bắt buộc.',
        'string.empty': 'Không được để rỗng'
      }),
    password: Joi.string()
      .min(8)
      .max(30)
      .pattern(new RegExp('(?=.*[a-z])'))
      .pattern(new RegExp('(?=.*[A-Z])'))
      .pattern(new RegExp('(?=.*[0-9])'))
      .pattern(new RegExp('(?=.*[!@#$%^&*])'))
      .messages({
        'string.empty': 'Không được để rỗng',
        'string.min': 'Mật khẩu phải có ít nhất 8 ký tự.',
        'string.max': 'Mật khẩu không được vượt quá 30 ký tự.',
        'string.pattern.base': 'Mật khẩu phải bao gồm chữ hoa, chữ thường, số, và ký tự đặc biệt.',
        'any.required': 'Mật khẩu là bắt buộc.'
      })
  })

  try {
    await correctCondition.validateAsync(req.body) // abortEarly trả về tất cả lỗi
    next()
  } catch (error) {
    next(new ApiError(500, error.message))
  }
}

export const authValidation = {
  validRegister,
  validLogin
}
