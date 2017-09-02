const GetJWT = () =>
    localStorage.getItem("auth");

const LogIn = (jwt) => localStorage.setItem("auth", jwt);

const LoggedIn = () =>
    localStorage.getItem("auth") !== null;

const Logout = () =>
    localStorage.removeItem("auth");

export {LoggedIn, Logout, LogIn, GetJWT};