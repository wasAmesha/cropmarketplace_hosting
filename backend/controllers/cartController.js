import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export async function AddToCart(req, res) {
  try {
    const checkCart = await Cart.findOne({
      postId: req.body.postId,
      userId: req.body.userId,
    });
    if (checkCart) return res.status(400).send("Already added to cart");
    const newItem = new Cart({
      postId: req.body.postId,
      productId: req.body.productId,
      userId: req.body.userId,
      quantity: req.body.quantity,
      price: req.body.price
    });
    res.status(200).send("Added to cart successfully");
    await newItem.save();
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function GetCartByUser(req, res) {
  try {
    const cartItems = await Cart.find({ userId: req.params.userId });
    const cartWithData = await Promise.all(
      cartItems.map(async (cart) => {
        const product = await Product.findById(cart.productId);
        const cartData = cart.toObject();
        delete cartData.productId;
        return { ...cartData, product };
      })
    );
    res.status(200).send(cartWithData);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function UpdateCartById(req, res) {
  try {
    await Cart.findByIdAndUpdate(req.body.id, {
      quantity: req.body.quantity,
    });
    res.status(200).send("Updated Successfully");
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function DeleteCartById(req, res) {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted Successfully");
  } catch (error) {
    res.status(500).send(error);
  }
}
