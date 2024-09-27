import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import api from "../../api/api";
import Button from "../../components/Button";
import { Input } from "../../components/Input";

interface Props {
  navigation: NativeStackNavigationProp<ParamListBase, "signup">;
}

const ChangeInfos = ({ navigation }: Props) => {
  const [name, setName] = useState();
  const [CPF, setCPF] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    fetchAsync();
    async function fetchAsync() {
      const data = await (await api.get("/users")).data;
      console.log(data);
      setName(data.name);
      setPhone(data.phone);
      setCPF(data.cpf);
    }
  }, []);

  const handleEdit = async () => {
    if (!name || !CPF || !phone) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await api
        .put("/users", { name, cpf: CPF, phone })
        .then((response) => {
          return response;
        });
      if (response.status) {
        Alert.alert("Edição feito com sucesso!");
        navigation.navigate("Perfil");
      } else {
        Alert.alert("Erro", "Credenciais inválidas.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Algo deu errado. Tente novamente.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Text style={styles.title}>Editar Conta</Text>
        <View style={styles.inputContainer}>
          <Input
            title={"Nome"}
            placeholder={"Digite o seu nome..."}
            value={name}
            onChange={setName}
          />
          <Input
            title={"CPF"}
            placeholder={"Digite o seu cpf..."}
            value={CPF}
            onChange={setCPF}
          />
          <Input
            title="Telefone"
            placeholder="Digite o seu telefone..."
            value={phone}
            onChange={setPhone}
          />
        </View>
        <View>
          <View style={styles.loginButton}>
            <Button title={"Editar"} onPress={handleEdit} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FEF4",
    display: "flex",
  },
  title: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: "bold",
  },
  inputContainer: {
    marginTop: 20,
    gap: 16,
  },
  loginButton: {
    marginTop: 40,
  },
  underlineTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  underlineText: {
    color: "#343434",
    fontFamily: "Montserrat_400Regular",
    fontSize: 16,
  },
  linkUnderlineText: {
    color: "#00B603",
    fontFamily: "Montserrat_400Regular",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default ChangeInfos;
