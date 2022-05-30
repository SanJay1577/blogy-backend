import express from "express";
import { deleteArticle, editAnArticle, getAllArticle, postAnArticle } from "../controllers/article.js";
import { isSignedIn } from "../controllers/auth.js";

const router = express.Router(); 

router.get("/article", isSignedIn,getAllArticle); 

router.post("/article",isSignedIn,postAnArticle); 

router.put("/article", isSignedIn,editAnArticle); 

router.delete("/article", isSignedIn, deleteArticle); 

router.post("/str/task", isSignedIn, async(req, res)=>{
    try {
        const str = await req.body.string; 
  
        const sortedValue = str
        .toLowerCase()
        .split("")
        .sort()
        .filter(word => word !== " "); 
    
    const count = {}; 
    const result = await sortedValue.join("")
   const countedValue = await sortedValue.forEach(element => {
    
      count[element] = (count[element] || 0)+1; 
      });
  
   
return res.status(200).json({result, countedValue}); 
    } catch (error) {
       return res.status(500).json({error:"Internal server error"})
    }
    
})

export const articleRouter = router; 