import Product from "../models/Product.js";

export async function getProductByCategory(req, res) {
  const category = req.params.category;
  try {
    const products = await Product.find({ productCategory: category });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ status: "Error fetching products" });
  }
}

export async function GetAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ status: "Error fetching products" });
  }
}

export async function AddNewProduct(req, res) {
  try {
    const newProduct = new Product({ ...req.body });
    await newProduct.save();
    res.status(200).send("Product added successfully");
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function UpdateProduct(req, res) {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send("Product updated successfully");
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function DeleteProduct(req, res) {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("Product deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
}
