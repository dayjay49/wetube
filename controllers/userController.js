import routes from "../routes";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join"}); 
}

export const postJoin = (req, res) => {
    const {
        body: {name, email, password, password2}
    } = req;
    if (password !== password2) {
        // bad request
        res.status(400);
        res.render("join", { pageTitle: "Join"}); 
    } else {
        // To Do: Register User
        // To Do: Log user in
        res.redirect(routes.home)
    }
}

export const userLogin = (req, res) => res.render("login", { pageTitle: "Log In"});
export const userLogout = (req, res) => res.render("logout", { pageTitle: "Log Out"});

export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "User Details"});
export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile"});
export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password"});