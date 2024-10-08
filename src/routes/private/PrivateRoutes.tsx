import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditReport from "../../screens/EditReport";
import Profile from "../../screens/Profile";
import ChangeInfos from "../../screens/Profile/ChangeInfos";
import ReportList from "../../screens/Profile/ReportList";
import Report from "../../screens/Report";
import ViewReport from "../../screens/ViewReport";

const Stack = createNativeStackNavigator();

const PrivateRouters = () => {
  return (
    <Stack.Navigator
      initialRouteName="Reportar"
      screenOptions={{ headerShown: true, animation: "slide_from_right" }}
    >
      <Stack.Screen name="Reportar" component={Report} />
      <Stack.Screen name="Perfil" component={Profile} />
      <Stack.Screen name="Lista de Ocorrências" component={ReportList} />
      <Stack.Screen name="Alterar Informações" component={ChangeInfos} />
      <Stack.Screen name="Editar Ocorrência" component={EditReport} />
      <Stack.Screen name="Ver Ocorrência" component={ViewReport} />
    </Stack.Navigator>
  );
};

export default PrivateRouters;
