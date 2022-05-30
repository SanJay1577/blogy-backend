import { Article } from "../models/article.js";

const getAllArticle = async (req, res) => {
  try {
    const article = await Article.find().populate("user", "name");
    if (!article)
      return res.status(400).json({ error: "Cannot find any article" });
    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const postAnArticle = async (req, res) => {
  try {
    const { title, description } = await req.body;
    if (!title || !description)
      return res.status(400).json({ error: "All fields are required" });
    const article = await new Article({
      title,
      description,
      user: req.user._id,
    }).save();
    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const editAnArticle = async (req, res) => {
  try {
    const articleId = await req.body.articleId;
    if (!articleId)
      return res.status(400).json({ error: "Please select an article" });
    const updatedArticle = await Article.findOneAndUpdate(
      { _id: articleId },
      { $set: req.body },
      { new: true }
    );
    if (!updatedArticle)
      return res.status(400).json({ error: "Cannot update your article" });
    return res.status(200).json(updatedArticle);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const articleId = await req.body.articleId;
    if (!articleId)
      return res.status(400).json({ error: "Please select an article" });
    const selectedArticle = await Article.findOneAndDelete({ _id: articleId });
    if (!selectedArticle)
      return res
        .status(400)
        .json({ error: "Please select an article to delete" });
    return res.status(200).json({ message: "Sucessfully deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { getAllArticle, postAnArticle, editAnArticle, deleteArticle };
