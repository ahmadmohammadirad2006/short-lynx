const mongoose = require('mongoose');
const { isURL } = require('validator');
const urlSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, 'A URL must have an address'],
      validate: [isURL, 'This URL is invalid'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

urlSchema.virtual('shortUrl').get(function () {
  return `${process.env.BASE_URL}/shortened/${this._id}`;
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
