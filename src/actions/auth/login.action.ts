import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebase } from "src/firebase";

export const loginAction = defineAction({
  input: z.object({
    email: z.string().email(),
    password: z.string(),
    remember_me: z.boolean().optional().default(false),
  }),
  handler: async ({ email, password, remember_me }, { cookies }) => {
    if (remember_me) {
      cookies.set("email", email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        // httpOnly: true,
        path: "/",
      });
    } else {
      cookies.delete("email", {
        path: "/",
      });
    }

    try {
      const user = await signInWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

      return JSON.stringify({
        message: "Usuario logueado",
        user,
      });
    } catch (error) {
      console.log(error, "SERVER ERROR");
      throw new Error("No fue posible iniciar sesion");
    }
  },
});
