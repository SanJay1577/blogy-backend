import express from "express";
import {
  deleteArticle,
  editAnArticle,
  getAllArticle,
  postAnArticle,
} from "../controllers/article.js";
import { isSignedIn } from "../controllers/auth.js";

const router = express.Router();

router.get("/article", isSignedIn, getAllArticle);

router.post("/article", isSignedIn, postAnArticle);

router.put("/article", isSignedIn, editAnArticle);

router.delete("/article", isSignedIn, deleteArticle);

router.post("/str/task", isSignedIn, async (req, res) => {
  try {
    const str = await req.body.string;
    //removing the spaces
    let strwithoutSpace = str.replace(/ /g, "");
    //sorting the given array
    let sortedArr = strwithoutSpace.toLowerCase().split("").sort();
    //finding the space index
    let spaceIndexArr = [];
    let inputArr = input.split("");
    for (let i = 0; i < inputArr.length; i++) {
      if (inputArr[i] == " ") {
        spaceIndexArr.push(i);
      }
    }
    //making the space index to spited array
    for (let j = 0; j < spaceIndexArr.length; j++) {
      sortedArr.splice(spaceIndexArr[j], 0, " ");
    }
    const resultArr = await sortedArr.join("");
    //counting the number of aarays....

    const count = {};
    const countedValue = await sortedArr.forEach((element) => {
      count[element] = (count[element] || 0) + 1;
    });

    return res.status(200).json({ resultArr, countedValue });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export const articleRouter = router;
