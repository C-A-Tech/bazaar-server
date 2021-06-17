const express = require('express');
const router = express.Router();

const Basket = require('../models/Basket');

const calculateTotal = (products) => {
  let total = 0
  products.forEach(product => total += product.quantity * product.price)
  return total
}
router.post('/', async (req, res) => {
  try{
    const user = req.body.user
    let basket = await Basket.findOne({ user });
    if(!basket.length){
      res.json(basket)
    }
    
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
        basket.total = calculateTotal(basket.products)
        basket.products.push({ productId, quantity, name, price });
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

router.delete('/delete/:id', async (req, res) => {
	try {
    const basketId = req.params.id
    const basket = await Basket.findById(basketId);
    console.log(basket)

		if (!basket) {
			return res.status(404).json({ msg: 'basket not found' });
		}

		await basket.remove();

		res.json({ msg: 'Basket emptied' });
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

router.put('/removeItem', async (req, res) => {
	try {
    const { productId, user } = req.body;
		const basket = await Basket.findOne({ user });
    let itemIndex = basket.products.findIndex(p => p.productId == productId);
    console.log(itemIndex)
    if (itemIndex > -1) {
      let product = basket.products[itemIndex]
      basket.total -= product.price * product.quantity 
      basket.products.splice(itemIndex, 1);
      await basket.save();
      res.json({ msg: 'item removed' });
    } else {
      res.json({ msg: "no such items" })
    }
		
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
  }
});
module.exports = router;