import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from "../../screens/Profile";
import Report from "../../screens/Report";

const Stack = createNativeStackNavigator()

const PrivateRouters = () => {
    return (
        <Stack.Navigator initialRouteName="Reportar" screenOptions={{ headerShown: true, animation: 'slide_from_right' }}>
            {/* <Stack.Screen name="enter" component={Enter} /> */}
            <Stack.Screen name="Reportar" component={Report} />
            <Stack.Screen name="Perfil" component={Profile} />
        </Stack.Navigator>
    )
}

export default PrivateRouters;