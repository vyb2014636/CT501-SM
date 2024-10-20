const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var otpSchema = new mongoose.Schema(
  {
    email: {
      type: String
    },
    otpCode: {
      type: String
    },
    otpExpired: {
      type: Date,
      default: Date.now,
      expires: 60
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Otp', otpSchema)
