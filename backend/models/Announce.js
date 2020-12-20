const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnounceSchema = new Schema({
      user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
      },
      productName: {
            type: String,
            required: true,

      },

      productImages: [String],

      productCategory: {
            type: String,
            required: true,

      },
      quantity: {
            type: Number,
            required: true,

      },
      price: {
            type: Number,
            required: true,
      },
      Description: {
            type: String,
            required: true,

      },
      userName: {
            type: String,
      },
      userImage: {
            type: String
      },
      likes: [
            {
                  user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                  }
            }
      ],
      comments: [
            {
                  user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                  },
                  text: {
                        type: String,
                        required: true
                  },
                  name: {
                        type: String,
                  },
                  image: {
                        type: String,
                  },
                  date: {
                        type: Date,
                        default: Date.now
                  }

            }

      ],

}, { timestamps: true });

module.exports = Announce = mongoose.model('announce', AnnounceSchema);