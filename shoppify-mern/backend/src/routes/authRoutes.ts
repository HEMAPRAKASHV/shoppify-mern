import { Router } from "express"
import { Login_User, Register_User, Refresh_Access_Token } from "../controllers/authController";
import { loginValidator, registrationValidators } from "../validators/authValidators";
import { validate } from "../middleware/expressValidator";

const authRouter = Router();

authRouter.post("/register", registrationValidators,validate, Register_User)
authRouter.post("/login", loginValidator, validate, Login_User)
authRouter.post("/refreshToken", Refresh_Access_Token)

export default authRouter;