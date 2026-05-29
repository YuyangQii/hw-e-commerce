import { Router } from "express";
import { getAllUsersController, getUserByIdController, searchUserController, createUserController, updateUserController, deleteUserController } from "./user.controller";

const router = Router();

router.get("/search", searchUserController);
router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);
router.post("/", createUserController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;
