import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  type AuthError,
} from "firebase/auth";
import { firebase } from "src/firebase";

export const registerAction = defineAction({
  input: z.object({
    name: z.string().min(2),
    email: z.string().email().min(2),
    password: z.string().min(3),
    remember_me: z.boolean().optional().default(false),
  }),
  accept: "form",
  handler: async ({ email, name, password, remember_me }, { cookies }) => {
    console.log({ email, name, password, remember_me });
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
    //creacion de usuario
    try {
      const user = await createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

      if (!firebase.auth.currentUser) {
        throw new Error("Not user found");
      }

      //actualizar el nombre
      await updateProfile(firebase.auth.currentUser, { displayName: name });

      //verificar el correo electronico
      await sendEmailVerification(firebase.auth.currentUser, {
        url: "http://localhost:4321/protected?emailVerified=true",
      });

      return JSON.stringify(user);
    } catch (error) {
      const firebaseError = error as AuthError;
      if (firebaseError.code) {
        throw new Error("El correo ya esta en uso");
      }

      throw new Error("Algo salio mal!");
    }
  },
});
