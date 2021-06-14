const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Basket = require('../models/Basket');


router.post("/add", async (req, res) => {
  const { productId, quantity, name, userId } = req.body;
  try {
    let basket = await Basket.findOne({ userId });


    if (basket) {
      let itemIndex = basket.products.findIndex(p => p.productId == productId);

      if (itemIndex > -1) {
        let productItem = basket.products[itemIndex];
        productItem.quantity = quantity;
        basket.products[itemIndex] = productItem;
      } else {
        basket.products.push({ productId, quantity, name });
      }
      basket = await basket.save();
      return res.json(basket);
    } else {
      //no basket for user, create new basket
      const newBasket = await Basket.create({
        userId,
        products: [{ productId, quantity, name }]
      });

      return res.json(newBasket);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;