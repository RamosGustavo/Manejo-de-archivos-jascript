import express, { urlencoded } from "express";
import ProductRouter from "./routes/products.js";
import CartRouter from "./routes/cart.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
