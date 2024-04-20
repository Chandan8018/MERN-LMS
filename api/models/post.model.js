import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/product-release-business-concept_198530-878.jpg",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    authorname: {
      type: String,
      default: "Anonymous",
    },
    ISBN: {
      type: String,
      default: "None",
    },
    qty: {
      type: Number,
      default: 1,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const post = mongoose.model("post", postSchema);

export default post;
