import express from "express";
import dotenv from "dotenv";
import connect_db from "./db/connectDB.js";
import authRouter from "./routes/authRoute.js";
import morgan from "morgan";
import notFoundMiddleware from "./middleware/notFound.js";
import errorHandleMiddleware from "./middleware/errorHandler.js";

dotenv.config();
const app = express();
app.use(express.json());
 if (process.env.NODE_ENV !== "production") {
//   app.use(morgan("dev"));
 }
 import path from "path";
 import { dirname } from "path";
 import { fileURLToPath } from "url";

//MIDDLEWARE
app.use("/v1/auth", authRouter);
app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);
app.use(express.urlencoded({ extended: false }));


const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "../client2/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client2/build", "index.html"));
});

app.get("/", (req, res) => {
  res.json({ msg: "Server Up" });
});
app.get("/v1", (req, res) => {
  res.json({ msg: "API" });
});

 const port = process.env.PORT;
const start = async () => {
  try {
    await connect_db(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();


