import passport from "passport";
import User from "./models/User";

// Creates a configured passport-local LocalStrategy instance
// that can be used (more on passportJS documentation)
passport.use(User.createStrategy());

// "Hey passport only send the userId as the cookie"
passport.serializeUser(User.serializeUser());

// "Hey passport, get me the user with the corresponding cookie"
passport.deserializeUser(User.deserializeUser());
