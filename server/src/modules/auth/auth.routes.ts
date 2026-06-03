import { Router } from "express";
import { signupController, loginController, logoutController, getMeController } from "./auth.controller";
import { validate } from "../../core/validate.middleware";
import { signupSchema, loginSchema } from "./auth.validator";
import { requireAuth } from "./auth.middleware";

const router = Router();

router.post("/signup", validate(signupSchema), signupController);
router.post("/login", validate(loginSchema), loginController);
router.post("/logout", logoutController);
router.get("/me", requireAuth, getMeController); 

export default router;
