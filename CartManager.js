import fs from "fs";
import { writeFile, readFile } from "./helpers.js";

const update = (list, item) =>
    list.map((i) => {
        if (i.id === item.id) {
            return {
                ...i,
                ...item,
            };
        }
        return i;
    });

class CartManager {
    constructor(filePath) {
        this.path = filePath;
        try {
            this.carts = fs.readFileSync(filePath);
            this.carts = JSON.parse(this.carts);
        } catch (err) {
            this.carts = [];
        }
    }
    async getCart(cid) {
        const cart = this.carts.find((c) => c.id === cid);
        if (!cart) {
            throw new Error("Cart not found");
        }
        const products = await readFile("./Products.json");
        const cartProducts = cart.products.map((p) =>
            products.find((product) => product.id === p.id)
        );

        return {
            cartId: cart.id,
            products: cartProducts,
        };
    }
    async createCart() {
        const newCart = {
            products: [],
            id: this.carts.length + 1,
        };
        this.carts.push(newCart);
        await writeFile(this.path, this.carts);
    }

    async updateCart(cId, pId) {
        let cart = this.carts.find((c) => c.id === cId);
        const product = cart.products.find((p) => p.id === pId);
        if (!product) {
            cart.products.push({ id: pId, quantity: 1 });
            this.carts = update(this.carts, cart);
            return await writeFile(this.path, this.carts);
        }
        cart.products = update(cart.products, {
            ...product,
            quantity: product.quantity + 1,
        });

        this.carts = update(this.carts, cart);

        await writeFile(this.path, this.carts);
    }
}

export default new CartManager("./Carts.json");
