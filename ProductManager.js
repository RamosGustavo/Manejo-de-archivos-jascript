import fs from "fs";
import { writeFile, readFile } from "./helpers.js";

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        try {
            this.products = fs.readFileSync(filePath);
            this.products = JSON.parse(this.products);
        } catch (err) {
            this.products = [];
        }
    }

    async addProduct(product) {
        const {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
            status,
        } = product;
        if (this.products.find((p) => p.code === code)) {
            throw new Error("Error: Codigo ya existe.");
        } else if (!title) {
            throw new Error("Error: titulo es requerido.");
        } else if (!description) {
            throw new Error("Error: descripción es requerida.");
        } else if (!price) {
            throw new Error("Error: precio es requerido.");
        } else if (!thumbnail) {
            throw new Error("Error: thumbnail es requerido.");
        } else if (!code) {
            throw new Error("Error: codigo es requerido.");
        } else if (!stock) {
            throw new Error("Error: stock es requerido.");
        }

        let p = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
            status,
            id: this.products.length + 1,
        };

        this.products.push(p);
        await writeFile(this.path, this.products);
    }

    getProducts({ limit }) {
        if (limit) {
            this.products = this.products.slice(0, Number(limit));
        }
        return this.products;
    }

    async updateProduct(product, id) {
        if (product.hasOwnProperty("id")) {
            throw new Error("Error: El id no puede ser modificado.");
        }
        const p = this.products.find((p) => id === p.id);
        if (!p) {
            throw new Error("Error: El producto no existe.");
        }
        this.products = this.products.map((p) => {
            if (p.id === id) {
                return {
                    ...p,
                    ...product,
                };
            }
            return p;
        });
        await writeFile(this.path, this.products);
    }

    async deleteProduct(id) {
        this.products = this.products.filter((p) => p.id !== id);
        await writeFile(this.path, this.products);
    }

    async getProductsById(id) {
        try {
            this.products = await readFile(this.path);
            const product = this.products.find((p) => p.id === id);
            if (!product) {
                return console.log("Error: Not found");
            }
            return product;
        } catch (error) {
            console.log("Error linea 73", error);
        }
    }
}

export default new ProductManager("./Products.json");
