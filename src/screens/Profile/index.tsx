import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./Profile";
import ReportList from "./ReportList";
import EditReport from "../EditReport";
import ChangeInfos from "./ChangeInfos";

const { Navigator, Screen } = createNativeStackNavigator();

const ProfileStackNavigation = () => {
    return (
        <Navigator initialRouteName="profile" screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}>
            <Screen name="profile" component={Profile} />
            <Screen
                name="reportList"
                component={ReportList}
                options={{
                    title: "Lista de Reportes",
                    headerTitleAlign: "center",
                    headerShown: true,
                    headerTintColor: "#FFFFFF",
                    headerStyle: {
                        backgroundColor: "#00B603"
                    }
                }}
            />
            <Screen name="chnageInfos" component={ChangeInfos} />
            <Screen name="editReport" component={EditReport} />
        </Navigator>
    )
}

export default ProfileStackNavigation;