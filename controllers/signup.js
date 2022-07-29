import 'dotenv/config';
import { getUsers, userExists } from "../services/userService.js";
import User from "../model/user.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jsonwebtoken from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export const Signup = async (req, res) => {
  try {
    const users = await getUsers();

    const { first_name, last_name, email, password } = req.body;
    if (!(first_name, last_name, email, password)) {
      return " Must provide all fields ";
    }
    if (!users) return "No users found in db";
    const encryptedPassword = await bcrypt.hash(password, 10);
    const oldUser = await userExists({ email: email.toLowerCase() });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    const token = jsonwebtoken.sign({ user_id: user._id, email }, jwtSecret, {
      expiresIn: "2h",
    });
    user.token = token;
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!(email, password)) {
      res.status(400).send("All input is required");
    }
    const user = await userExists({ email: email.toLowerCase() });
    console.log("user.password", user.password);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jsonwebtoken.sign(
        { user_id: user._id, email },
        jwtSecret,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;

      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};
