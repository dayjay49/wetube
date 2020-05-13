import routes from "./routes";
import multer from "multer";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  console.log(req.user);
  // since this is a middleware of all possible routes, it makes sure
  // to know which user is logged on
  res.locals.user = req.user || null;
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
