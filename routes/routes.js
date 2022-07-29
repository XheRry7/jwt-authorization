import { AsyncRouter } from "express-async-router";
import { Signup, Login } from "../controllers/signup.js";
import withAuth from "../middleware/auth.js";

const router = AsyncRouter();

router.post("/sign-up", Signup);

router.post("/login", Login);

router.get("/welcome", withAuth, (req, res) => {
    res.status(200).send("Welcome  ");
  });

export default router;
