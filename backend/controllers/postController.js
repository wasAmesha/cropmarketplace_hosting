import Post from "../models/Post.js";
import Product from "../models/Product.js";

export async function addNewPost(req, res) {
  try {
    const newPost = new Post({
      productId: req.body.productId,
      userId: req.body.userId,
      quantity: req.body.quantity,
      type: req.body.type,
      vehicleModelName: req.body.vehicleModelName,
      vehicleCapacity: req.body.vehicleCapacity,
      vehicleImage: req.body.vehicleImage,
      price: req.body.price,
      district: req.body.district,
      company: req.body.company,
      mobile: req.body.mobile,
      email: req.body.email,
      address: req.body.address,
      expireDate: req.body.expireDate,
    });

    await newPost.save();

    res.status(200).send("Saved successfully");
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updatePost(req, res) {
  try {
    await Post.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send("Updated Successfully");
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getAllPosts(req, res) {
  try {
    const posts = await Post.find();
    const postsWithData = await Promise.all(
      posts.map(async (post) => {
        const product = await Product.findById(post.productId);
        const postData = post.toObject();
        delete postData.productId;
        return { ...postData, product };
      })
    );
    res.status(200).send(postsWithData);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getPostsByUser(req, res) {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    const postsWithData = await Promise.all(
      posts.map(async (post) => {
        const product = await Product.findById(post.productId);
        const postData = post.toObject();
        delete postData.productId;
        return { ...postData, product };
      })
    );
    res.status(200).send(postsWithData);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getPostsByCategory(req, res) {
  try {
    const posts = await Post.find({ type: req.params.type });
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getPostById(req, res) {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    const product = await Product.findById(post.productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({ ...post.toObject(), product });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ message: "Internal server error" });
  }
}

export async function deletePostById(req, res) {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted successfully");
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
}
