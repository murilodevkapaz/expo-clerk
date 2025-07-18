import { router, Slot } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { CLERK_PUBLISHABLE_KEY } from "@/shared/constants/general";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { tokenCache } from "./storage/tokenCache";

const InitialLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      router.replace("/(auth)");
    } else {
      router.replace("/(public)");
    }
  }, [isSignedIn]);

  return isLoaded ? (
    <Slot />
  ) : (
    <ActivityIndicator
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    />
  );
};

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <InitialLayout />
    </ClerkProvider>
  );
}
