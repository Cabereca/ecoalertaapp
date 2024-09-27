import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ParamListBase, RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ocurrence from "../../interfaces/Ocurrence";
import { updateOccurrenceRoute } from "../../services/updateOccurrenceRoute";

interface Props {
  navigation: NativeStackNavigationProp<ParamListBase, "Editar Ocorrência">;
}

type EditReportRouteProp = RouteProp<{ editReport: { ocurrence: Ocurrence } }>;

const EditReport = ({ navigation }: Props) => {
  const { ocurrence } = useRoute<EditReportRouteProp>().params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showDate, setShowDate] = useState(
    new Date(ocurrence.dateTime).toLocaleDateString()
  );
  const [showRealDate, setShowRealDate] = useState(ocurrence.dateTime);
  const [description, setDescription] = useState(ocurrence.description);
  const [title, setTitle] = useState(ocurrence.title);

  const createOcurrence = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const data = {
        title,
        description,
        userId,
        dateTime: String(showRealDate),
        status: "OPEN",
      };
      console.log(data, String(showRealDate));
      // console.log({title, description, lat: String(position.latitude), long: String(position.longitude), date: showDate, showHour});

      // data.append("ImagesOccurrence", imagesPath);

      await updateOccurrenceRoute(data, ocurrence.id);

      navigation.goBack();
      navigation.goBack();
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  const onChangeDate = (event, date) => {
    if (date) {
      // console.log("DATAAAA", new Date(date))
      const currentDate = date || selectedDate;
      setShow(false);
      setShowRealDate(date);
      setSelectedDate(currentDate);
      setShowDate(currentDate.toLocaleDateString());
    }
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <View style={style.container}>
      <ScrollView style={{ paddingTop: 10 }}>
        <View style={style.formContainer}>
          <Text style={{ ...style.formTitle, marginBottom: 20 }}>
            Editar Ocorrência
          </Text>
          <View style={style.inputContainer}>
            <Text style={style.message}>Informe o título da ocorrência</Text>
            <TextInput
              style={style.genericInput}
              placeholder="Informe um título"
              placeholderTextColor="#949191"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <Text style={style.message}>Informe a data da ocorrência</Text>
            <View>
              <TouchableOpacity
                onPress={showDatePicker}
                style={style.dateInput}
              >
                <Text style={style.dateText}>{showDate}</Text>
              </TouchableOpacity>
            </View>

            {show && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display={Platform.OS === "android" ? "default" : "spinner"}
                onChange={onChangeDate}
                minimumDate={new Date(2000, 0, 1)}
              />
            )}

            <Text style={style.message}>Informe a decrição da ocorrência</Text>
            <TextInput
              style={style.genericInput}
              placeholder="Informe uma descrição"
              placeholderTextColor="#949191"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            <TouchableOpacity
              style={{ ...style.reportButton, marginBottom: 50 }}
              onPress={createOcurrence}
            >
              <Text style={style.reportButtonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FEF4",
  },
  topContainer: {
    alignItems: "center",
  },
  message: {
    marginBottom: -10,
    color: "#343434",
    fontFamily: "Montserrat_400Regular",
    fontWeight: "bold",
  },
  containerMap: {
    width: "100%",
    height: 200,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  formTitle: {
    fontSize: 28,
    fontFamily: "Montserrat_700Bold",
    color: "#343434",
  },
  formDescription: {
    fontFamily: "Montserrat_400Regular",
    color: "#343434",
    marginBottom: 20,
  },
  inputContainer: {
    gap: 10,
  },
  genericInput: {
    height: 55,
    width: "100%",
    borderRadius: 5,
    borderBottomColor: "#00B603",
    borderBottomWidth: 5,
    padding: 10,
    color: "#343434",
    fontFamily: "Montserrat_400Regular",
    fontSize: 16,
  },
  dateInput: {
    height: 55,
    padding: 10,
    borderRadius: 5,
    borderBottomColor: "#00B603",
    borderBottomWidth: 5,
    justifyContent: "center",
  },
  dateText: {
    color: "#343434",
    fontFamily: "Montserrat_400Regular",
    fontSize: 16,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  imageWrapper: {
    alignItems: "center",
  },
  imageReport: {
    width: 64,
    height: 64,
    borderRadius: 10,
  },
  removeText: {
    color: "#ff4d4d",
    fontFamily: "Montserrat_700Bold",
    marginTop: 5,
  },
  updateImageButton: {
    height: 80,
    padding: 10,
    borderBlockColor: "gray",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#00B603",
    borderBottomWidth: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  updateImageButtonIcon: {
    width: 20,
    height: 20,
  },
  updateImageButtonText: {
    color: "#343434",
    fontFamily: "Montserrat_400Regular",
  },
  reportButton: {
    width: "100%",
    height: 55,
    backgroundColor: "#00B603",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  reportButtonText: {
    color: "#fff",
    fontFamily: "Montserrat_700Bold",
  },
});

export default EditReport;
