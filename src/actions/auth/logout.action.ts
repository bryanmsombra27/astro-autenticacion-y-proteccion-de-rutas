import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { firebase } from "src/firebase";
import { signOut } from "firebase/auth";
export const logoutAction = defineAction({
  accept: "json",
  handler: async (_, { cookies }) => {
    return await signOut(firebase.auth);
  },
});
