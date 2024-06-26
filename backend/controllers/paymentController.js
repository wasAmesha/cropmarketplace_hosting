import Payment from "../models/Payment.js";
import Cart from "../models/Cart.js";
import Post from "../models/Post.js";
import Product from "../models/Product.js";
import Offer from "../models/Offer.js";

export async function AddNewPayment(req, res) {
  const {
    buyerId,
    deliveryId,
    cartItems,
    postId,
    offeredFarmer,
    deliveryDetails,
    paymentDetails,
    deliveryStatus,
  } = req.body;

  try {
    if (cartItems !== null) {
      const cartItemPromises = cartItems.map(async (item) => {
        await Cart.findByIdAndDelete(item._id);
        const post = await Post.findById(item.postId);
        await Post.findByIdAndUpdate(post._id, {
          quantity: post.quantity - item.quantity,
        });
        const newCartData = { ...item, deliveryStatus: deliveryStatus };
        return newCartData;
      });

      const cartWithStatus = await Promise.all(cartItemPromises);
      const newPayment = new Payment({
        buyerId,
        deliveryId,
        cartItems: cartWithStatus,
        postId,
        deliveryDetails,
        paymentDetails,
      });
      await newPayment.save();
      return res.status(200).send("Payment Success");
    }

    const newPayment = new Payment({
      buyerId,
      deliveryId,
      cartItems: null,
      postId,
      offeredFarmer,
      deliveryDetails,
      paymentDetails,
      deliveryStatus,
    });
    await newPayment.save();
    await Offer.findOneAndDelete({ postId: postId, receiverId: buyerId });

    res.status(200).send("Payment Success");
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function UpdateStatus(req, res) {
  const payment = await Payment.findById(req.body.id);
  if (payment.cartItems !== null) {
    const cartStatus = await Promise.all(
      payment.cartItems.map((cart) => {
        if (cart._id == req.body.cartId) {
          const cartData = { ...cart };
          const statuses = [...cart.deliveryStatus];
          statuses.push(req.body.status);
          cartData.deliveryStatus = statuses;
          return cartData;
        }
        return cart;
      })
    );

    await Payment.findByIdAndUpdate(req.body.id, {
      cartItems: cartStatus,
    });
    const updatedPayment = await Payment.findById(req.body.id);
    return res.status(200).send(updatedPayment);
  }
  const statuses = [...payment.deliveryStatus];
  statuses.push(req.body.status);
  await Payment.findByIdAndUpdate(req.body.id, {
    deliveryStatus: statuses,
  });
  const updatedPayment = await Payment.findById(req.body.id);
  res.status(200).send(updatedPayment);
}

export async function GetAllOrdersBySeller(req, res) {
  try {
    const payments = await Payment.find({ buyerId: req.params.id });

    if (!payments || payments.length === 0) {
      console.log("No payments found for this buyer.");
      return res
        .status(404)
        .send({ message: "No payments found for this seller." });
    }
    const fetchedOrders = await Promise.all(
      payments.map(async (pay) => {
        if (!pay.cartItems || pay.cartItems.length === 0) {
          if (pay.postId !== null) {
            const post = await Post.findById(pay.postId);
            if (!post) {
              return res.status(404).send({ message: "Post not found" });
            }
            const product = await Product.findById(post.productId);
            if (!product) {
              return res.status(404).send({ message: "Product not found" });
            }
            return [
              {
                orderId: pay._id,
                product: product,
                qty: post.quantity + " KG",
                deliveryFee: pay.paymentDetails.deliveryFee.toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "LKR",
                  }
                ),
                totalAmount: (
                  post.price * post.quantity +
                  pay.paymentDetails.deliveryFee
                ).toLocaleString("en-US", {
                  style: "currency",
                  currency: "LKR",
                }),
                deliveryDetails: pay.deliveryDetails,
                deliveryStatus: pay.deliveryStatus,
              },
            ];
          }
        }

        const cartWithData = await Promise.all(
          pay.cartItems.map(async (cart) => {
            return {
              orderId: cart._id,
              product: cart.product,
              qty: cart.quantity + " KG",
              deliveryFee: pay.paymentDetails.deliveryFee.toLocaleString(
                "en-US",
                {
                  style: "currency",
                  currency: "LKR",
                }
              ),
              totalAmount: (
                cart.price * cart.quantity +
                pay.paymentDetails.deliveryFee
              ).toLocaleString("en-US", {
                style: "currency",
                currency: "LKR",
              }),
              deliveryDetails: pay.deliveryDetails,
              deliveryStatus: cart.deliveryStatus,
            };
          })
        );

        return cartWithData.filter((order) => order !== null);
      })
    );
    const orders = fetchedOrders
      .flat()
      .filter((order) => Object.keys(order).length > 0);

    console.log("Final fetched orders:", orders);

    res.status(200).send(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send(error);
  }
}

export async function GetAllOrdersByFarmer(req, res) {
  try {
    const payments = await Payment.find();

    if (!payments || payments.length === 0) {
      console.log("No payments found for this buyer.");
      return res
        .status(404)
        .send({ message: "No payments found for this seller." });
    }
    const fetchedOrders = await Promise.all(
      payments.map(async (pay) => {
        if (!pay.cartItems || pay.cartItems.length === 0) {
          if (pay.postId !== null) {
            if (pay.offeredFarmer == req.params.id) {
              const post = await Post.findById(pay.postId);
              if (!post) {
                return res.status(404).send({ message: "Post not found" });
              }
              const product = await Product.findById(post.productId);
              if (!product) {
                return res.status(404).send({ message: "Product not found" });
              }
              return [
                {
                  orderId: post._id,
                  product: product,
                  qty: post.quantity + " KG",
                  deliveryFee: pay.paymentDetails.deliveryFee.toLocaleString(
                    "en-US",
                    {
                      style: "currency",
                      currency: "LKR",
                    }
                  ),
                  totalAmount: (
                    post.price * post.quantity +
                    pay.paymentDetails.deliveryFee
                  ).toLocaleString("en-US", {
                    style: "currency",
                    currency: "LKR",
                  }),
                  deliveryDetails: pay.deliveryDetails,
                  deliveryStatus: pay.deliveryStatus,
                },
              ];
            }
            return [];
          }
        }

        const cartWithData = await Promise.all(
          pay.cartItems.map(async (cart) => {
            const post = await Post.findById(cart.postId);
            if (!post) {
              return res.status(404).send({ message: "Post not found" });
            }
            const product = await Product.findById(post.productId);
            if (!product) {
              return res.status(404).send({ message: "Product not found" });
            }

            if (post.userId == req.params.id) {
              return {
                orderId: cart._id,
                product: cart.product,
                qty: cart.quantity + " KG",
                deliveryFee: pay.paymentDetails.deliveryFee.toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "LKR",
                  }
                ),
                totalAmount: (
                  cart.price * cart.quantity +
                  pay.paymentDetails.deliveryFee
                ).toLocaleString("en-US", {
                  style: "currency",
                  currency: "LKR",
                }),
                deliveryDetails: pay.deliveryDetails,
                deliveryStatus: cart.deliveryStatus,
              };
            }

            return {};
          })
        );

        return cartWithData.filter((order) => order !== null);
      })
    );
    const orders = fetchedOrders
      .flat()
      .filter((order) => Object.keys(order).length > 0);

    // console.log("Final fetched orders:", orders);

    res.status(200).send(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send(error);
  }
}

export async function GetAllOrdersByDeliveryman(req, res) {
  try {
    const payments = await Payment.find();

    if (!payments || payments.length === 0) {
      console.log("No payments found for this buyer.");
      return res
        .status(404)
        .send({ message: "No payments found for this seller." });
    }
    const fetchedOrders = await Promise.all(
      payments.map(async (pay) => {
        const deliveryPost = await Post.findById(pay.deliveryId);
        if (deliveryPost.userId != req.params.id) {
          console.log("No deliveries found for this buyer.");
          return [];
        }
        console.log(pay._id);
        if (!pay.cartItems || pay.cartItems.length === 0) {
          if (pay.postId !== null) {
            const post = await Post.findById(pay.postId);
            if (!post) {
              return res.status(404).send({ message: "Post not found" });
            }
            const product = await Product.findById(post.productId);
            if (!product) {
              return res.status(404).send({ message: "Product not found" });
            }
            return [
              {
                payId: pay._id,
                orderId: pay._id,
                product: product,
                qty: post.quantity + " KG",
                deliveryFee: pay.paymentDetails.deliveryFee.toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "LKR",
                  }
                ),
                totalAmount: (
                  post.price * post.quantity +
                  pay.paymentDetails.deliveryFee
                ).toLocaleString("en-US", {
                  style: "currency",
                  currency: "LKR",
                }),
                deliveryDetails: pay.deliveryDetails,
                deliveryStatus: pay.deliveryStatus,
              },
            ];
          }
        }

        const cartWithData = await Promise.all(
          pay.cartItems.map(async (cart) => {
            return {
              payId: pay._id,
              orderId: cart._id,
              product: cart.product,
              qty: cart.quantity + " KG",
              deliveryFee: pay.paymentDetails.deliveryFee.toLocaleString(
                "en-US",
                {
                  style: "currency",
                  currency: "LKR",
                }
              ),
              totalAmount: (
                cart.price * cart.quantity +
                pay.paymentDetails.deliveryFee
              ).toLocaleString("en-US", {
                style: "currency",
                currency: "LKR",
              }),
              deliveryDetails: pay.deliveryDetails,
              deliveryStatus: cart.deliveryStatus,
            };
          })
        );

        return cartWithData.filter((order) => order !== null);
      })
    );
    const orders = fetchedOrders
      .flat()
      .filter((order) => Object.keys(order).length > 0);

    // console.log("Final fetched orders:", orders);

    res.status(200).send(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send(error);
  }
}
