import { Router } from "express";
import { getAllUsersController, getUserByIdController, searchUserController, createUserController, updateUserController, deleteUserController } from "./user.controller";
import { validate } from "../../core/validate.middleware";
import { createUserSchema, updateUserSchema } from "./user.validator";
import { requireAuth, requireRole } from "../auth/auth.middleware";

const router = Router();

router.get("/search", requireAuth, searchUserController);
router.get("/", requireAuth, requireRole("admin"), getAllUsersController);  // 只有 admin 能查所有用户
router.get("/:id", requireAuth, getUserByIdController);
router.post("/", validate(createUserSchema), createUserController);        // 注册不需要登录
router.put("/:id", requireAuth, validate(updateUserSchema), updateUserController);
router.delete("/:id", requireAuth, deleteUserController);

export default router;
