const mongoose = require("mongoose");

const BasketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    products: [
      {
        productId: String,
        quantity: Number,
        name: String,
        price: Number
      }
    ],
    total: {
      type: Number,
      default: 0
    },
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Basket", BasketSchema);