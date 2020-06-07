import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import { NULL } from "node-sass";

// JOIN or SIGN UP
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    req.flash("error", "Passwords do NOT match");
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      // Create and register user
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

// Log In Authentications (Local, Facebook, Github)
export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Log In" });
};
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  successFlash: "Welcome",
  failureFlash: "Can't login. Check email and/or password",
});

export const facebookLogin = passport.authenticate("facebook", {
  successFlash: "Welcome",
  failureFlash: "Can't log in at this time",
});
export const facebookLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  // console.log(profile);
  const {
    _json: { id, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      user.facebookId = id;
      user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        email,
        name,
        facebookId: id,
        avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};
export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const githubLogin = passport.authenticate("github", {
  successFlash: "Welcome",
  failureFlash: "Can't log in at this time",
});
export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  // Finding user from mongoDB that matches email from github. If found, set its github ID and
  // if not found, create new user
  const {
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};
export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.flash("info", "Logged out, pce out!");
  req.logout(); // built in funtion by passport
  req.session.destroy(function (err) {
    res.clearCookie("connect.sid");
    res.redirect(routes.home);
  });
  res.redirect(routes.home);
};

// PROFILE PAGE
export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Details", user: req.user });
};

// GET USER DETAIL
export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    console.log(user);
    res.render("userDetail", { pageTitle: "User Details", user });
  } catch (error) {
    req.flash("error", "User not found");
    res.redirect(routes.home);
  }
};

// EDIT PROFILE
export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl,
    });
    req.flash("success", "Profile Updated!");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Can't update profile.");
    res.redirect(routes.editProfile);
  }
};

// CHANGE PASSWORD
export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  const user = await User.findById(req.user._id);
  try {
    if (newPassword !== newPassword1) {
      req.flash("error", "Passwords do NOT match");
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
    } else {
      // await req.user.changePassword(oldPassword, newPassword);
      await user.setPassword(newPassword);
      user.save();
      req.flash("success", "Password successfullly changed!");
      res.redirect(routes.me);
    }
  } catch (error) {
    req.flash("error", "Can't change password");
    console.log(error);
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};
