import { Router } from "express";
import { getCartController, addItemController, removeItemController, clearCartController } from "./cart.controller";
import { validate } from "../../core/validate.middleware";
import { addCartItemSchema } from "./cart.validator";

const router = Router();

router.get("/:userId", getCartController);
router.post("/:userId/items", validate(addCartItemSchema), addItemController);
router.delete("/:userId/items/:productId", removeItemController);
router.delete("/:userId", clearCartController);

export default router;
