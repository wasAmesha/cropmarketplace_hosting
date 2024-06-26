import bodyParser from "body-parser";
import cors from "cors";
import user from "../routes/userRoute.js";
import product from "../routes/productRoute.js";
import post from "../routes/postRoute.js";
import cart from "../routes/cartRoute.js";
import payment from "../routes/paymentRoute.js";
import offer from "../routes/offerRoute.js";

export default function (app) {
  app.use(cors());
  app.use(bodyParser.json({ limit: "1mb" }));
  app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));

  app.use("/api/v1/user", user);
  app.use("/api/v1/product", product);
  app.use("/api/v1/post", post);
  app.use("/api/v1/cart", cart);
  app.use("/api/v1/payment", payment);
  app.use("/api/v1/offer", offer);
}
