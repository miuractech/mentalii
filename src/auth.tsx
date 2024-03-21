// src/components/GoogleAuthButton.js

import React from "react";
import { Button, Center } from "@mantine/core";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./config";

function GoogleAuthButton() {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // The signed-in user info.
    } catch (error: any) {
      console.error("Error signing in with Google: ", error.message);
    }
  };

  return (
    <Center className="h-screen text-center">
      <div>
        <h1>Mentalli </h1>
        <br />
        <Button onClick={signInWithGoogle} color="blue" radius="xl" size="md">
          Sign in with Google
        </Button>
      </div>
    </Center>
  );
}

export default GoogleAuthButton;
