import mongoose from 'mongoose'
// Declare the Schema of the Mongo model
var postSchema = new mongoose.Schema(
  {
    byPost: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    describe: {
      type: String
    },
    picture: {
      type: String
    },
    video: {
      type: String
    },
    comment: [
      {
        user: { type: mongoose.Types.ObjectId, ref: 'User' },
        content: String,
        like: Boolean
      }
    ],
    byLike: [
      {
        user: { type: mongoose.Types.ObjectId, ref: 'User' }
      }
    ],
    byDislike: [
      {
        user: { type: mongoose.Types.ObjectId, ref: 'User' }
      }
    ]
  },
  {
    timestamps: true
  }
)

//Export the model
export default mongoose.model('Post', postSchema)
