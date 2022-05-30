import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "user",
    },
  },
  { timestamps: true}
);

const Article = mongoose.model("article", articleSchema);

export { Article };
