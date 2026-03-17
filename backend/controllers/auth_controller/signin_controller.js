import { UserModel } from "../../models/User.js";
import bcrypt from "bcryptjs";

export const signInController = async (req, res) => {
  const { name, email, password, address, role } = req.body || "";

  if (!email || !password) {
    return res.status(400).json({
      message: "Email & Password both are required!",
      status: false,
    });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        message:
          "You are already register with same email Id. please Log in now!!",
        status: false,
        user
      });
    }

    bcrypt.hash(password, Number(process.env.SALT_ROUND), async (err, hash) => {
      if (err) {
        return res.status(500).json({
          message: "Password hashing required!",
          status: false,
          err
        });
      }

      const safeRole = role === "admin" || role === "user" ? role : undefined;
      const newUser = await UserModel({
        name,
        address,
        email,
        password: hash,
        ...(safeRole ? { role: safeRole } : {}),
      });
      await newUser.save();

      return res.json(
        {
          message: "Registration successful!",
          status: true,
          user: newUser
        },
      );
    });
  } catch (error) {
    return res.status(400).json(
      {
        message: "Error in Register controller!",
        status: false,
        error,
      },
    );
  }
};
