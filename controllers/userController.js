export const userJoin = (req, res) => res.render("join", { pageTitle: "Join"}); 
export const userLogin = (req, res) => res.render("login", { pageTitle: "Log In"});
export const userLogout = (req, res) => res.render("logout", { pageTitle: "Log Out"});

export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "User Details"});
export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile"});
export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password"});