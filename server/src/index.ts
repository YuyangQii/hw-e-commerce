import "dotenv/config";
import express from "express";
import cors from "cors";
import { errorMiddleware } from "./core/errors";
import { productRouter } from "./modules/products";
import { cartRouter } from "./modules/cart";
import { userRouter } from "./modules/users";
import authRouter from "./modules/auth/auth.routes";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({ message: "Lecture E-Commerce API is running", port: PORT });
});

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/users", userRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
