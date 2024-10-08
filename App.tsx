import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { LogBox } from "react-native";
import useCustomFonts from "./assets/fonts/useFonts";
import { AuthContext, AuthProvider } from "./src/contexts/AuthContext";
import PrivateRoutes from "./src/routes/private/PrivateRoutes";
import PublicRoutes from "./src/routes/public/PublicRoutes";

function AppContent() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getToken() {
      try {
        const token = await AsyncStorage.getItem("token");

        if (token) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        console.error("Failed to get token:", error);
        setIsAuth(false);
      }

      setIsLoading(false);
    }

    getToken();
  }, []);

  if (isLoading) {
    return;
  }

  return (
    <NavigationContainer>
      {isAuth ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useCustomFonts();
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();
  console.warn = () => {};

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <StatusBar backgroundColor="#292929" style="inverted" />
      <AppContent />
    </AuthProvider>
  );
}
