import { registerAction } from "./auth/register.action";
import { logoutAction } from "./auth/logout.action";
import { loginAction } from "./auth/login.action";
import { loginGoogleAction } from "./auth/login-google.action";

export const server = {
  register: registerAction,
  logOut: logoutAction,
  login: loginAction,
  loginWithGoogle: loginGoogleAction,
};
