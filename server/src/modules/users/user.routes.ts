import { Router } from "express";
import { getAllUsersController, getUserByIdController, searchUserController, createUserController, updateUserController, deleteUserController } from "./user.controller";
import { validate } from "../../core/validate.middleware";
import { createUserSchema, updateUserSchema } from "./user.validator";

const router = Router();

router.get("/search", searchUserController);
router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);
router.post("/", validate(createUserSchema), createUserController);       
router.put("/:id", validate(updateUserSchema), updateUserController);    
router.delete("/:id", deleteUserController);

export default router;
