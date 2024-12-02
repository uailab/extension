import { Router } from "express";

import usersRouter from "./resources/user.router";

const router = Router();

router.get("/ping", (req, res) => {
    res.sendStatus(200);
});

router.use("/users", usersRouter);

export default router;