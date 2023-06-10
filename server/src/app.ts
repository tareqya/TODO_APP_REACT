import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as bodyParser from "body-parser";
import ProjectRouter from "./Routers/ProjectRouter";

const DATABASE_URL = "mongodb://localhost:27017/TODO_APP";

mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("connected to TODO APP DATABASE"))
  .catch((e) => console.log(e));

const corsHolder = cors({ origin: true });
const app = express();

app.use(corsHolder);
app.use(bodyParser.json());
app.use("/api", ProjectRouter);
const port = 3030;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
