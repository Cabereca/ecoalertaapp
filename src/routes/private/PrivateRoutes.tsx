import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from "../../screens/Profile";
import Report from "../../screens/Report";
import ReportList from '../../screens/Profile/ReportList';
import ChangeInfos from '../../screens/Profile/ChangeInfos';

const Stack = createNativeStackNavigator()

const PrivateRouters = () => {
    return (
        <Stack.Navigator initialRouteName="Reportar" screenOptions={{ headerShown: true, animation: 'slide_from_right' }}>
            <Stack.Screen name="Reportar" component={Report} />
            <Stack.Screen name="Perfil" component={Profile} />
            <Stack.Screen name="Lista de Ocorrências" component={ReportList} />
            <Stack.Screen name="Alterar Informações" component={ChangeInfos} />
        </Stack.Navigator>
    )
}

export default PrivateRouters;