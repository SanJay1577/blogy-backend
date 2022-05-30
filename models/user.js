import mongoose from "mongoose";
import joi from "joi";
import passwordComplexity from "joi-password-complexity";
import jwt from "jsonwebtoken"; 

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

const validateRegister = (data) => {
  const schema = joi.object({
    name: joi.string().required().label("Name"),
    email: joi.string().email().required().label("Email"),
    password: passwordComplexity().required(),
  });
  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().label("Email"),
    password: passwordComplexity().required(),
  });
  return schema.validate(data);
};
const genreateToken = (id)=>{
 return jwt.sign({id}, process.env.SECRET_JWT, {expiresIn:"30d"});
}
export { User, validateRegister, validateLogin, genreateToken};

