import express from "express";
import morgan from "morgan";             
import cors from "cors";

import defaultConfig  from "@assets/config/default";
import router from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/v1", router);

if (defaultConfig.useMorganLogRequest) app.use(morgan('tiny')); 

export default app;