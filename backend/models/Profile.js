const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
      user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
      },
      image: {
            type: String,
            required: true
      },
      location: {
            type: String,
            required: true,
      },

      farmerDomaine: {
            type: [String],
            required: true,
      },
      adresse: {
            type: String,
            required: true,
      },
      SeasonalProduct: [{

            ProductName: {
                  type: String,
                  required: true
            },

            from: {
                  type: Date,
                  required: true
            },
            to: {
                  type: Date
            },

            description: {
                  type: String
            }



      }],




}, { timestamps: true });

module.exports = Profile = mongoose.model('profile', ProfileSchema);