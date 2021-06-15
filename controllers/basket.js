const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Basket = require('../models/Basket');

const calculateTotal = (products) => {
  let total = 0
  products.forEach(product => total += product.quantity * product.price)
  return total
}
router.get('/', async (req, res) => {
  try{
    const user = req.body.user
    let basket = await Basket.findOne({ user });
    res.json(basket)
  } catch(err){
    res.status(500).send("Server error");
  }
})
router.post("/add", async (req, res) => {
  const { productId, quantity, name, user, price } = req.body;
  try {
    let basket = await Basket.findOne({ user });


    if (basket) {
      let itemIndex = basket.products.findIndex(p => p.productId == productId);

      if (itemIndex > -1) {
        let productItem = basket.products[itemIndex];
        productItem.quantity = quantity;
        basket.products[itemIndex] = productItem;
        basket.total = calculateTotal(basket.products)
      } else {
        let total = calculateTotal(basket.products)
        basket.products.push({ productId, quantity, name, price, total });
      }
      basket = await basket.save();
      return res.json(basket);
    } else {
      //no basket for user, create new basket

      let total = quantity * price
      const newBasket = await Basket.create({
        user,
        products: [{ productId, quantity, name, price }],
        total
      });

      return res.json(newBasket);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;