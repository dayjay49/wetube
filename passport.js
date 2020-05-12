import passport from "passport";
import User from "./models/User";

// Creates a configured passport-local LocalStrategy instance
// that can be used (more on passportJS documentation)
passport.use(User.createStrategy());
