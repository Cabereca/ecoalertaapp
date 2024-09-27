import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import api from "../../api/api";
import logo from "../../assets/logo.png";
import Button from "../../components/Button";
import HeaderWithLogo from "../../components/HeaderWithLogo";
import { Input } from "../../components/Input";
import { InputPasswordButton } from "../../components/inputPasswordButton";

interface Props {
  navigation: NativeStackNavigationProp<ParamListBase, "Cadastro">;
}

const Signup = ({ navigation }: Props) => {
  const [name, setName] = useState();
  const [CPF, setCPF] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();

  const handleSignup = async () => {
    if (!name || !CPF || !email || !password || !phone) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await api
        .post("/users", { name, cpf: CPF, email, password, phone })
        .then((response) => {
          return response;
        });
      if (response.status) {
        Alert.alert("Cadastro feito com sucesso!", "Faça login...");
        navigation.navigate("Login");
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
        <HeaderWithLogo image={logo} title={`Criar conta`} />
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
            title="E-mail"
            placeholder="Digite o seu email..."
            value={email}
            onChange={setEmail}
          />
          <Input
            title="Telefone"
            placeholder="Digite o seu telefone..."
            value={phone}
            onChange={setPhone}
          />
          <InputPasswordButton
            title="Senha"
            place="Digite a sua senha..."
            state={setPassword}
            valuePassword={password}
          />
        </View>
        <View>
          <View style={styles.loginButton}>
            <Button title={"Cadastrar"} onPress={handleSignup} />
          </View>
          <View style={{ ...styles.underlineTextContainer, marginBottom: 20 }}>
            <Text style={styles.underlineText}>Já possui uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.linkUnderlineText}>Login</Text>
            </TouchableOpacity>
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

export default Signup;
