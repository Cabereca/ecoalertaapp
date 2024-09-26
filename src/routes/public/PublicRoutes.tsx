import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/Login";
import Signup from "../../screens/Signup";

const Stack = createNativeStackNavigator();
const PublicRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Signup} />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
