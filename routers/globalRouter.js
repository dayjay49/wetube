import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { getJoin, postJoin, userLogin, userLogout } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.login, userLogin);
globalRouter.get(routes.logout, userLogout);

export default globalRouter;