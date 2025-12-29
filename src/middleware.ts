import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase";

const privateRoutes = ["/protected"];
const notAuthenticatedRoutes = ["/login", "/register"];

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(
  async ({ url, request, locals, redirect }, next) => {
    const isLoggedIn = !!firebase.auth.currentUser;
    const user = firebase.auth.currentUser;

    if (user) {
      locals.user = {
        avatar: user.photoURL ?? "",
        email: user.email!,
        name: user.displayName!,
        emailVerified: user.emailVerified,
      };
    }

    locals.isLoggedIn = isLoggedIn;

    if (!isLoggedIn && privateRoutes.includes(url.pathname)) {
      return redirect("/");
    }

    if (isLoggedIn && notAuthenticatedRoutes.includes(url.pathname)) {
      return redirect("/");
    }

    return next();
  }
);
