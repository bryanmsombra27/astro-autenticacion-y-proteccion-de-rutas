import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { firebase } from "src/firebase";

export const loginGoogleAction = defineAction({
  accept: "json",
  input: z.any(),
  handler: async (credentials) => {
    const credential = GoogleAuthProvider.credentialFromResult(credentials);

    if (!credential)
      throw new Error("No fue posible acceder a las credenciales");

    await signInWithCredential(firebase.auth, credential);
    return "inicio de sesion exitoso";
  },
});
