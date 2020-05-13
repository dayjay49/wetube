import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
import GithubStrategy from "passport-github";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";
import routes from "./routes";

// Creates a configured passport-local LocalStrategy instance
// that can be used (more on passportJS documentation)
passport.use(User.createStrategy());

// github authentication
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

// "Hey passport only send the userId as the cookie"
passport.serializeUser(User.serializeUser());

// "Hey passport, get me the user with the corresponding cookie"
passport.deserializeUser(User.deserializeUser());
