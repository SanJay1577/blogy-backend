import {
  genreateToken,
  User,
  validateLogin,
  validateRegister,
} from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 

const register = async (req, res) => {
  try {
    //validating the details...
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    //chcking wheather the user is already registered ....
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).json({ error: "email already registered" });

    //generating hashed Password from bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);

    //saving the new user to the database
    user = await new User({ ...req.body, password: hashpassword }).save();
    //generaring jwt Token
    const token = genreateToken(user._id);

    //destructuring the data to be given...
    const { _id, name, email } = await user;
    return res.status(200).json({ user: { _id, name, email }, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    //validating the details...
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    //find the user is available oin database
    const user = await User.findOne({ email: req.body.email });

    //error handling
    if (!user) return res.status(400).json({ error: "Invalid Authentication" });

    //comaparing the encrypted Password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).json({ error: "Invalid Authentication" });

    //generating token
    const token = genreateToken(user._id);
    const { _id, name, email } = await user;

    //returning user details
    return res.status(200).json({ user: { _id, name, email }, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const isSignedIn = async(req, res, next)=>{
  let token; 
  if(
    req.headers.authorization && 
    req.headers.authorization.startsWith("Bearer")
    ){
      try {
         token  = await req.headers.authorization.split(" ")[1]; 
         const decode = jwt.verify(token, process.env.SECRER_KEY); 
         req.user = await User.findById(decode.id).select("-password"); 
         next(); 

      } catch (error) {
        return req.status(400).json({error:"Problem in Authorization"})
      }
    }
    if(!token)
    return res.status(400).json({error:"Access Denied"})
}

export { register, login, isSignedIn};
