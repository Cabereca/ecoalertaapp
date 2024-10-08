import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import {
  getCurrentPositionAsync,
  LocationObject,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import logo from "../../assets/logo.png";
import { createOcurrenceRoute } from "../../services/createOcurrenceRoute";

const Report = ({ navigation }) => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showDate, setShowDate] = useState("dd/mm/yyyy");
  const [showRealDate, setShowRealDate] = useState(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const [imagesPath, setImagesPath] = useState([]);

  const createOcurrence = async () => {
    try {
      if (
        position.latitude === 0 ||
        title === "" ||
        description === "" ||
        showRealDate === null
      ) {
        Alert.alert("Erro", "Por favor, preencha todos os campos.");
        return;
      }

      const userId = await AsyncStorage.getItem("userId");
      const data1 = {
        title,
        description,
        location: `${position.latitude} ${position.longitude}`,
        userId,
        dateTime: new Date(showRealDate),
        // ImageOccurrence: [],
        status: "OPEN",
        ImageOccurrence: [
          {
            path: imagesPath.length > 0 ? imagesPath[0] : "",
            occurrenceId: "xx",
          },
        ],
      };
      console.log(data1, String(showRealDate));
      // console.log({title, description, lat: String(position.latitude), long: String(position.longitude), date: showDate, showHour});

      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("location", JSON.stringify(position));
      data.append("dateTime", String(showRealDate));
      data.append("userId", userId);
      data.append("status", "OPEN");
      // data.append("ImagesOccurrence", imagesPath);

      imagesPath.forEach((imageURI, index) => {
        data.append("images", {
          name: `image_${index}.jpg`,
          type: "image/jpg",
          uri: imageURI,
        } as any);
      });

      await createOcurrenceRoute(data);

      navigation.navigate("Lista de Ocorrências");

      clear();
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

  function clear() {
    setPosition({ latitude: 0, longitude: 0 });
    setShowDate("dd/mm/yyyy");
    setShowRealDate(null);
    setDescription("");
    setTitle("");
    setImagesPath([])
  }

  const handleSelectImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("É necessário acesso à câmera!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setImagesPath([...imagesPath, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = imagesPath.filter((_, i) => i !== index);
    setImagesPath(updatedImages);
  };

  const requestLocationPermissions = async () => {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  };

  const handleSelectMapPosition = (event: MapPressEvent) => {
    setPosition(event.nativeEvent.coordinate);
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

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  return (
    <View style={style.container}>
      <ScrollView style={{ paddingTop: 10 }}>
        <View
          style={{
            margin: 15,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Image source={logo} style={{ width: 50, height: 50 }} />
          <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
            <FontAwesome name="user-circle-o" size={50} />
          </TouchableOpacity>
        </View>
        <View style={style.formContainer}>
          <Text style={style.formTitle}>Criar Ocorrência</Text>
          <Text style={style.formDescription}>
            Utilize as informações para reportar o crime.
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

            <View style={style.imageContainer}>
              {imagesPath.map((imgUri, index) => (
                <View key={index} style={style.imageWrapper}>
                  <Image style={style.imageReport} source={{ uri: imgUri }} />
                  <TouchableOpacity onPress={() => removeImage(index)}>
                    <Text style={style.removeText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <Text style={style.message}>
              Utilize o mapa para definir o local do crime
            </Text>
            <View style={style.topContainer}>
              <View style={style.containerMap}>
                {location ? (
                  <MapView
                    style={style.map}
                    initialRegion={{
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                      latitudeDelta: 0.005,
                      longitudeDelta: 0.005,
                    }}
                    onPress={handleSelectMapPosition}
                  >
                    {position.latitude != 0 ? (
                      <Marker
                        coordinate={{
                          latitude: position.latitude,
                          longitude: position.longitude,
                        }}
                      />
                    ) : (
                      <Marker
                        coordinate={{
                          latitude: location.coords.latitude,
                          longitude: location.coords.longitude,
                        }}
                      />
                    )}
                  </MapView>
                ) : (
                  <Text>Carregando mapa...</Text>
                )}
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSelectImages}
              style={style.updateImageButton}
            >
              <Ionicons name="images-sharp" color="#00B603" size={20} />
              <Text style={{...style.updateImageButtonText, fontWeight: "bold" }}>Add imagem</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...style.reportButton, marginBottom: 50 }}
              onPress={createOcurrence}
            >
              <Text style={style.reportButtonText}>Reportar</Text>
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

export default Report;
