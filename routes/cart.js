import { Router } from "express";
import CartManager from "../CartManager.js";

const router = Router();

router.post("/", async (req, res) => {
    await CartManager.createCart();
    res.status(201);
});
router.get("/:cid", async (req, res) => {
    const cId = Number(req.params.cid);
    const cart = await CartManager.getCart(cId);
    res.status(200).json(cart);
});
router.post("/:cid/product/:pid", async (req, res) => {
    const cId = Number(req.params.cid);
    const pId = Number(req.params.pid);
    await CartManager.updateCart(cId, pId);
    res.status(201);
});

export default router;
