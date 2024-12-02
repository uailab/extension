import { Router } from "express";

import usersResource from "resources/users/users.resource";
import manageRequest from "@middlewares/manageRequest";
import auth from "@middlewares/auth";

const usersRouter = Router();

usersRouter.post("/auth/external/signin", manageRequest(usersResource.signInExternalAuthUser));
usersRouter.delete("/delete", auth, manageRequest(usersResource.deleteUser));
usersRouter.patch("/update", auth, manageRequest(usersResource.updateUser));
usersRouter.get("/auth/get", auth, manageRequest(usersResource.getUser));

export default usersRouter;