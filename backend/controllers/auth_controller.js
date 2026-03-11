import { UserModel } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const authController = async (req, res) => {
  const { email, password } = req.body || "";

  if (!email && !password) {
    return res.status(402).json({
      message: "eamil & password both are required!",
      status: false,
    });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found! Please register first!",
        status: false,
      });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(400).json({
          message: "Invalid credentials",
          status: false,
        });
      }

      let payload = {
        id: user._id,
        role: user.role,
      };

      let token = jwt.sign(process.env.JWT_SECRET, payload, {
        expiresIn: "7d",
      });

      return res.status(200).json(
        {
          message: "Log in successful!",
          status: true,
        },
        token,
        user,
      );
    });
  } catch (error) {
    console.log("error in log in controller", error);
    return res.status(502).json({
      message: "server error",
      status: false,
    });
  }
};