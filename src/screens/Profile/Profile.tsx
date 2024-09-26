import AsyncStorage from "@react-native-async-storage/async-storage";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext } from "react";
import { Alert, StyleSheet, View } from "react-native";
import ContainerScreen from "../../components/ContainerScreen";
import ProfileAvatar from "../../components/ProfileAvatar";
import ProfileOption from "../../components/ProfileOption";
import { AuthContext } from "../../contexts/AuthContext";

interface Props {
  navigation: NativeStackNavigationProp<ParamListBase, "Perfil">;
}

const Profile = ({ navigation }: Props) => {
  const { setIsAuth } = useContext(AuthContext);

  const handleLogout = async () => {
    Alert.alert("Logout?", "Tem certeza que deseja fazer logout?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        isPreferred: true,
        text: "Sim",
        onPress: doLogout,
        style: "default",
      },
    ]);
  };

  const doLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
    } catch (error) {
      console.error("Error on try get token from async storage");
    }

    setIsAuth(false);
  };

  return (
    <ContainerScreen>
      <ProfileAvatar />
      <View style={styles.Options}>
        <ProfileOption
          iconName="list-sharp"
          title="Suas Ocorrências"
          hasBorderBottom
          onPress={() => navigation.navigate("Lista de Ocorrências")}
        />
        <ProfileOption
          iconName="person"
          title="Alterar informações"
          hasBorderBottom
          onPress={() => navigation.navigate("Alterar Informações")}
        />
        <ProfileOption
          iconName="log-out-outline"
          title="Sair"
          isAllRedColor
          onPress={handleLogout}
        />
      </View>
    </ContainerScreen>
  );
};

const styles = StyleSheet.create({
  Options: {
    paddingTop: 20,
    alignItems: "center",
    borderRadius: 10,
    height: 570,
    backgroundColor: "#F4FEF4",
  },
});

export default Profile;
