import FontAwesome from "@expo/vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import imageIcon from "../../assets/icons/imageIcon.png";
import logo from "../../assets/images/logo.png";
import Ocurrence from "../../interfaces/Ocurrence";

type EditReportRouteProp = RouteProp<{ viewReport: { ocurrence: Ocurrence } }>;

const ViewReport = ({ navigation }) => {
  const { ocurrence } = useRoute<EditReportRouteProp>().params;

  const [position, setPosition] = useState(ocurrence.location);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showDate, setShowDate] = useState(
    new Date(ocurrence.dateTime).toLocaleDateString()
  );
  const [description, setDescription] = useState(ocurrence.description);
  const [title, setTitle] = useState(ocurrence.title);
  console.log(ocurrence);
  const [imagesPath, setImagesPath] = useState(ocurrence.Images);

  return (
    <View style={style.container}>
      <ScrollView style={{ paddingTop: 10 }}>
        <View style={style.formContainer}>
          <View style={style.inputContainer}>
            <Text style={style.message}>Título da ocorrência</Text>
            <TextInput
              editable={false}
              style={style.genericInput}
              placeholder="Informe um título"
              placeholderTextColor="#949191"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <Text style={style.message}>Data da ocorrência</Text>
            <View>
              <TouchableOpacity style={style.dateInput}>
                <Text style={style.dateText}>{showDate}</Text>
              </TouchableOpacity>
            </View>

            {show && (
              <DateTimePicker
                disabled={true}
                value={selectedDate}
                mode="date"
                display={Platform.OS === "android" ? "default" : "spinner"}
                minimumDate={new Date(2000, 0, 1)}
              />
            )}

            <Text style={style.message}>Decrição da ocorrência</Text>
            <TextInput
              editable={false}
              style={style.genericInput}
              placeholder="Informe uma descrição"
              placeholderTextColor="#949191"
              value={description}
            />

            <View style={style.imageContainer}>
              {imagesPath?.map(({ path }, index) => (
                <View key={index} style={style.imageWrapper}>
                  <Image style={style.imageReport} source={{ uri: path }} />
                  <TouchableOpacity>
                    <Text style={style.removeText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <Text style={style.message}>
              Local do crime:
            </Text>
            <View style={style.topContainer}>
              <View style={style.containerMap}>
                <MapView
                  style={style.map}
                  initialRegion={{
                    latitude: position.lat,
                    longitude: position.lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                >
                  {position.lat != 0 ? (
                    <Marker
                      coordinate={{
                        latitude: position.lat,
                        longitude: position.lng,
                      }}
                    />
                  ) : (
                    <Marker
                      coordinate={{
                        latitude: position.lat,
                        longitude: position.lng,
                      }}
                    />
                  )}
                </MapView>
              </View>
            </View>
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

export default ViewReport;
