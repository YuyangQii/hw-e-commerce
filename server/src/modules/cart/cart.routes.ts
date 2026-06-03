import { Router } from "express";
import { getCartController, addItemController, removeItemController, clearCartController } from "./cart.controller";
import { validate } from "../../core/validate.middleware";
import { addCartItemSchema } from "./cart.validator";
import { requireAuth } from "../auth/auth.middleware";

const router = Router();

router.get("/:userId", requireAuth, getCartController);
router.post("/:userId/items", requireAuth, validate(addCartItemSchema), addItemController);
router.delete("/:userId/items/:productId", requireAuth, removeItemController);
router.delete("/:userId", requireAuth, clearCartController);

export default router;
