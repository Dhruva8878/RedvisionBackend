import express from "express";
import Post from "../models/post.model.js"
import authenticate from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}).populate("userId").lean().exec();
    return res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("/", authenticate, async (req, res) => {
  console.log(req);
  try {
    const post = await Post.create(req.body);
    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("userId");
    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.patch("/:id", authenticate, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export default router;
