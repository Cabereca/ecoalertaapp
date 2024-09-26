import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import api from "../../api/api";
import ContainerScreen from "../../components/ContainerScreen";
import OcurrenceCard from "../../components/OcurrenceCard";
import Ocurrence from "../../interfaces/Ocurrence";

const ReportList = ({ navigation }) => {
  const [ocurrences, setOcurrences] = useState<Ocurrence[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    loadOcurrences();
  }, []);

  const loadOcurrences = async () => {
    let ocurrencesApi: Ocurrence[] = [];

    ocurrencesApi = (await api.get("/occurrence")).data;
    console.log("\n\n", ocurrencesApi);

    setOcurrences(ocurrencesApi);
  };

  const deleteOcurrence = async (id: string) => {
    await api.delete(`/occurrence/${id}`);
    alert("Ocorrência removida com sucesso!");
    navigation.goBack();
  };

  return (
    <ContainerScreen>
      {isFocused && (
        <StatusBar backgroundColor="#00B603" style="light" animated={true} />
      )}
      <FlatList
        contentContainerStyle={styles.Content}
        data={ocurrences}
        renderItem={({ item }) => (
          <OcurrenceCard
            key={item.id}
            ocurrence={item}
            onDeleteOcurrence={() => deleteOcurrence(item.id)}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.Text}>Você não possui nenhum reporte!</Text>
        )}
      />
    </ContainerScreen>
  );
};

const styles = StyleSheet.create({
  Content: {
    paddingBottom: 50,
    width: "100%",
    alignItems: "center",
    gap: 15,
  },
  Text: {
    fontSize: 15.89,
    fontWeight: "400",
    color: "#FFFFFF",
  },
});

export default ReportList;
