import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "./routes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/v1", router);

export default app;