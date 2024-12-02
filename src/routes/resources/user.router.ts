import { Router } from "express";

import usersResource from "resources/users/users.resource";
import manageRequest from "@middlewares/manageRequest";
import auth from "@middlewares/auth";

const usersRouter = Router();

usersRouter.post("/auth/external/signin", manageRequest(usersResource.signInExternalAuthUser));
usersRouter.patch("/auth/update", auth, manageRequest(usersResource.updateUser));
usersRouter.get("/auth/get", auth, manageRequest(usersResource.getUser));

export default usersRouter;