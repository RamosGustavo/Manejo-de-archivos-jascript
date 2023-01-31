import { Router } from "express";
import productManager from "../ProductManager.js";

const router = Router();

router.get("/", (req, res) => {
    const limit = req.query.limit;
    const products = productManager.getProducts({ limit });

    if (!products) {
        res.send("hubo un error");
    }

    res.json(products);
});

router.get("/:id", async (req, res) => {
    const params = req.params;
    console.log(params);
    const product = await productManager.getProductsById(Number(params.id));
    console.log(product);
    res.json(product);
});

router.post("/", async (req, res) => {
    try {
        const product = req.body;
        await productManager.addProduct(product);
        res.json({
            code: 201,
            message: "Product added successfully",
        });
    } catch (error) {
        res.json({
            code: 409,
            message: error.message,
        });
    }
});

router.delete("/:id", async (req, res) => {
    const productId = req.params.id;
    await productManager.deleteProduct(Number(productId));
    res.status(204).json();
});

router.put("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        await productManager.updateProduct(req.body, Number(productId));
        res.status(200);
    } catch (error) {
        res.json({
            code: 404,
            message: error.message,
        });
    }
});

export default router;
