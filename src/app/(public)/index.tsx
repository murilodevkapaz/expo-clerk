import Button from "@/components/Button";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const googleOAuth = useOAuth({ strategy: "oauth_google" });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onGoogleSignIn = async () => {
    try {
      setIsLoading(true);

      const redirectUrl = Linking.createURL("/");

      const oAuthFlow = await googleOAuth.startOAuthFlow({ redirectUrl });

      if (oAuthFlow.authSessionResult?.type !== "success") {
        console.error("OAuth flow failed:", oAuthFlow.authSessionResult);
        return;
      }

      if (oAuthFlow.setActive) {
        await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      // Handle the error appropriately, e.g., show an alert or log it
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <Button
        icon="logo-google"
        label="Entrar com Google"
        onPress={onGoogleSignIn}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
