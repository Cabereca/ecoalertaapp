import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/Login";
import Signup from "../../screens/Signup";
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from "react-native";
import Profile from "../../screens/Profile/Profile";
import Report from "../../screens/Report";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const { Navigator, Screen } = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Navigator initialRouteName="Home" screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: "#00B603",
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: { fontSize: 13, fontWeight: '400' },
            tabBarStyle: {
                backgroundColor: "#464646",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderStyle: "dashed",
                position: 'absolute',
                overflow: 'hidden',
                height: 60,
            },
            tabBarButton: (props) => (
                <TouchableOpacity
                    {...props}
                    style={[
                        props.style,
                        props.accessibilityState.selected
                            ? { borderTopColor: "#00B603", borderTopWidth: 2 }
                            : { borderTopColor: "#292929", borderTopWidth: 2},
                    ]}
                />
            ),
        })}>
            {/* <Screen name="Home" component={Home} options={{
                tabBarLabel: "Início",
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                        name={focused ? "home-outline" : "home-sharp"}
                        color={color}
                        size={size}
                    />
                )
            }} /> */}
            {/* <Screen name="Map" component={Map} options={{
                tabBarLabel: "Mapa",
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                        name={focused ? "location-outline" : "location-sharp"}
                        color={color}
                        size={size}
                    />
                )
            }} /> */}
            <Screen name="Report" component={Report} options={{
                tabBarLabel: "Reportar",
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                        name={focused ? "megaphone-outline" : "megaphone"}
                        color={color}
                        size={size}
                    />
                )
            }} />
            <Screen name="Profile" component={Profile} options={{
                tabBarLabel: "Perfil",
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                        name={focused ? "person-outline" : "person-sharp"}
                        color={color}
                        size={size}
                    />
                )
            }} />
        </Navigator>
    )
}

const PublicRoutes = () => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true, animation: 'slide_from_right' }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Signup} />
            <Stack.Screen name="Reportar" component={Report} />
            <Stack.Screen name="Perfil" component={Profile} />
        </Stack.Navigator>
    )
}

export default PublicRoutes;