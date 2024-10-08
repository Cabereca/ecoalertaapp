import AsyncStorage from "@react-native-async-storage/async-storage";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import api from "../../api/api";
import logo from "../../assets/logo.png";
import Button from "../../components/Button";
import HeaderWithLogo from "../../components/HeaderWithLogo";
import { InputEmailButton } from "../../components/inputEmailButton";
import { InputPasswordButton } from "../../components/inputPasswordButton";
import { AuthContext } from "../../contexts/AuthContext";

interface Props {
  navigation: NativeStackNavigationProp<ParamListBase, "Login">;
}

export default function Login({ navigation }: Props) {
  const { setIsAuth } = useContext(AuthContext);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleLogin = async () => {
    if (!inputEmail || !inputPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await api
        .post("/userLogin", { email: inputEmail, password: inputPassword })
        .then((response) => {
          return response;
        });
      if (response.status == 200) {
        const token = response.data.token;
        const userId = response.data.user.id;
        await AsyncStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        await AsyncStorage.setItem("userId", userId);
        setIsAuth(true);
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
      <HeaderWithLogo image={logo} title={`Login`} />

      {/* <Text style={{ color: "red", fontWeight: "bold" }}>
        TROQUE O IP DA API, NA API E NO ENV!!!!
      </Text> */}
      <View style={styles.inputContainer}>
        <InputEmailButton
          title="E-mail"
          place="Digite o seu email..."
          state={setInputEmail}
          valueEmail={inputEmail}
        />
        <InputPasswordButton
          title="Senha"
          place="Digite a sua senha..."
          state={setInputPassword}
          valuePassword={inputPassword}
        />
      </View>
      <View style={styles.loginButton}>
        <Button title={"Login"} onPress={handleLogin} />
      </View>
      <View style={styles.underlineTextContainer}>
        <Text style={styles.underlineText}>Não possui uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.linkUnderlineText}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FEF4",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  logoImage: {
    width: 40,
    height: 40,
  },
  title: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#343434",
    fontSize: 40,
    lineHeight: 40,
  },
  inputContainer: {
    marginTop: 40,
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
