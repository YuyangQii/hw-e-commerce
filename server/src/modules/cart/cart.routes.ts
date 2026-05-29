import { Router } from "express";
import { getCartController, addItemController, removeItemController, clearCartController } from "./cart.controller";

const router = Router();

router.get("/:userId", getCartController);
router.post("/:userId/items", addItemController);
router.delete("/:userId/items/:itemId", removeItemController);
router.delete("/:userId", clearCartController);

export default router;
