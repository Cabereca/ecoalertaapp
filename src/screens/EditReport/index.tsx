// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from "@react-native-picker/picker";
// import { ParamListBase, RouteProp, useRoute } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import * as ImagePicker from 'expo-image-picker';
// import {
//     getCurrentPositionAsync,
//     LocationObject,
//     requestForegroundPermissionsAsync
// } from "expo-location";
// import { useEffect, useState } from "react";
// import { Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import MapView, { MapPressEvent, Marker } from "react-native-maps";
// import api from "../../api/api";
// import imageIcon from '../../assets/icons/imageIcon.png';
// import Ocurrence from "../../interfaces/Ocurrence";
// import { findAllPoliceStations } from "../../services/findAllPoliceStations";

// interface Props {
//     navigation: NativeStackNavigationProp<ParamListBase, "editReport">
// }

// type EditReportRouteProp = RouteProp<{ editReport: { ocurrence: Ocurrence } }, 'editReport'>;

// const EditReport = ({ navigation }: Props) => {
//     const { ocurrence } = useRoute<EditReportRouteProp>().params;
//     const [location, setLocation] = useState<LocationObject | null>(null);
//     const [position, setPosition] = useState({ latitude: ocurrence.latitude, longitude: ocurrence.longitude });
//     const [selectedType, setSelectedType] = useState(ocurrence.type);
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [selectedHour, setSelectedHour] = useState(new Date());
//     const [show, setShow] = useState(false);
//     const [exibe, setExibe] = useState(false);
//     const [showDate, setShowDate] = useState(ocurrence.date);
//     const [showHour, setShowHour] = useState(ocurrence.time);
//     const [description, setDescription] = useState(ocurrence.description);
//     const [title, setTitle] = useState(ocurrence.title);
//     const [policeStations, setPoliceStations] = useState([]);
//     const [policeStationId, setPoliceStationId] = useState(ocurrence.PoliceStation.id);

//     const [imagesFromOcurrene, setImagesFromOcurrence] = useState(ocurrence.Images);
//     const [imagesToSend, setImagesToSend] = useState([]);

//     const createOcurrence = async () => {
//         try {
//             const data = new FormData();

//             data.append('title', title);
//             data.append('description', description);
//             data.append('type', selectedType);
//             data.append('latitude', String(position.latitude));
//             data.append('longitude', String(position.longitude));
//             data.append('date', showDate);
//             data.append('time', showHour);
//             data.append('user_id', ocurrence.User.id);
//             data.append('policeStation_id', policeStationId);

//             imagesToSend.forEach((image, index) => {
//                 data.append(`images`, {
//                     name: `image_${index}.jpg`,
//                     type: 'image/jpg',
//                     uri: image,
//                 } as any);
//             });

//             const { status } = await api.put(`/api/v1/ocurrences/${ocurrence.id}`, data, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 }
//             });

//             if (status === 200) {
//                 navigation.reset({
//                     index: 0,
//                     routes: [{ name: 'reportList' }]
//                 })
//             }
//         } catch (error) {
//             if (error.response) {
//                 console.error("Error response data:", error.response.data);
//                 console.error("Error response status:", error.response.status);
//                 console.error("Error response headers:", error.response.headers);
//             } else if (error.request) {
//                 console.error("Error request:", error.request);
//             } else {
//                 console.error("Error message:", error.message);
//             }
//         }
//     }

//     const handleSelectImages = async () => {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

//         if (status !== 'granted') {
//             alert('É necessário acesso à câmera!');
//             return;
//         }

//         let result = await ImagePicker.launchImageLibraryAsync({
//             allowsEditing: true,
//             quality: 1,
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         });

//         if (!result.canceled) {
//             setImagesToSend([...imagesToSend, result.assets[0].uri]);
//         }
//     }

//     const removeImageToSend = (index: number) => {
//         const updatedImages = imagesToSend.filter((_, i) => i !== index);
//         setImagesToSend(updatedImages);
//     }

//     const removeImageFromOcurrence = async (index: number, idImage: string) => {
//         const { status } = await api.delete(`/api/v1/images/${idImage}`);
//         if (status === 200) {
//             const updatedImages = imagesFromOcurrene.filter((_, i) => i !== index);
//             setImagesFromOcurrence(updatedImages);
//         }
//     }

//     const requestLocationPermissions = async () => {
//         const { granted } = await requestForegroundPermissionsAsync();

//         if (granted) {
//             const currentPosition = await getCurrentPositionAsync();
//             setLocation(currentPosition);
//         }
//     }

//     const requestPoliceStations = async () => {
//         const policeStations = await findAllPoliceStations();

//         setPoliceStations(policeStations);
//     }

//     const handleSelectMapPosition = (event: MapPressEvent) => {
//         setPosition(event.nativeEvent.coordinate);
//     }

//     const onChangeDate = (event, date) => {
//         if (date) {
//             const currentDate = date || selectedDate;
//             setShow(false);
//             setSelectedDate(currentDate);
//             setShowDate(currentDate.toLocaleDateString());
//         }
//     }

//     const onChangeHour = (event, hour) => {
//         if (hour) {
//             const currentHour = hour || selectedHour;
//             setExibe(false);
//             setSelectedHour(currentHour);
//             setShowHour(currentHour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
//         }
//     }

//     const showDatePicker = () => {
//         setShow(true);
//     }

//     const showHourPicker = () => {
//         setExibe(true);
//     }

//     useEffect(() => {
//         requestLocationPermissions();
//         requestPoliceStations();
//     }, []);

//     return (
//         <View style={style.container}>
//             <ScrollView style={{ marginBottom: 50 }}>
//                 <View style={style.topContainer}>
//                     <View style={style.containerMap}>
//                         {location ? (
//                             <MapView
//                                 style={style.map}
//                                 initialRegion={{
//                                     latitude: location.coords.latitude,
//                                     longitude: location.coords.longitude,
//                                     latitudeDelta: 0.005,
//                                     longitudeDelta: 0.005,
//                                 }}
//                                 onPress={handleSelectMapPosition}
//                             >
//                                 {
//                                     position.latitude != 0 ? (
//                                         <Marker
//                                             coordinate={{
//                                                 latitude: position.latitude,
//                                                 longitude: position.longitude,
//                                             }}
//                                         />
//                                     ) : (
//                                         <Marker
//                                             coordinate={{
//                                                 latitude: location.coords.latitude,
//                                                 longitude: location.coords.longitude,
//                                             }}
//                                         />
//                                     )
//                                 }

//                             </MapView>
//                         ) : (
//                             <Text>Carregando mapa...</Text>
//                         )}
//                     </View>
//                     <View style={style.containerMessage}>
//                         <Text style={style.message}>Utilize o mapa para definir o local do crime</Text>
//                     </View>
//                 </View>
//                 <View style={style.formContainer}>
//                     <Text style={style.formTitle}>Editar Reporte</Text>
//                     <Text style={style.formDescription}>Edite as informações do Reporte.</Text>
//                     <View style={style.inputContainer}>
//                         <TextInput
//                             style={style.genericInput}
//                             placeholder="Título do Reporte"
//                             placeholderTextColor="#949191"
//                             value={title}
//                             onChangeText={text => setTitle(text)}
//                         />
//                         <View>
//                             <TouchableOpacity onPress={showDatePicker} style={style.dateInput}>
//                                 <Text style={style.dateText}>{showDate}</Text>
//                             </TouchableOpacity>
//                         </View>
//                         <View>
//                             <TouchableOpacity onPress={showHourPicker} style={style.dateInput}>
//                                 <Text style={style.dateText}>{showHour}</Text>
//                             </TouchableOpacity>
//                         </View>

//                         {
//                             show && (
//                                 <DateTimePicker
//                                     value={selectedDate}
//                                     mode="date"
//                                     display={Platform.OS === 'android' ? 'default' : 'spinner'}
//                                     onChange={onChangeDate}
//                                     minimumDate={new Date(2000, 0, 1)}
//                                 />
//                             )
//                         }
//                         {
//                             exibe && (
//                                 <DateTimePicker
//                                     value={selectedHour}
//                                     mode="time"
//                                     display={Platform.OS === 'android' ? 'default' : 'spinner'}
//                                     onChange={onChangeHour}
//                                     minimumDate={new Date(2000, 0, 1)}
//                                 />
//                             )
//                         }
//                         <TextInput
//                             style={style.genericInput}
//                             placeholder="Descrição"
//                             placeholderTextColor="#949191"
//                             value={description}
//                             onChangeText={text => setDescription(text)}
//                         />

//                         <Picker
//                             selectedValue={selectedType}
//                             onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}
//                             style={style.genericInput}
//                             dropdownIconColor="#00B603"
//                         >
//                             <Picker.Item label="Tipo do crime" value="" enabled={false} />
//                             <Picker.Item label="Furto" value="furto" />
//                             <Picker.Item label="Assalto" value="Assalto" />
//                         </Picker>

//                         <Picker
//                             selectedValue={policeStationId}
//                             onValueChange={(itemValue, itemIndex) => setPoliceStationId(itemValue)}
//                             style={style.genericInput}
//                             dropdownIconColor="#00B603"
//                         >
//                             <Picker.Item label="Delegacia" value="" enabled={false} />
//                             {
//                                 policeStations.map((pStation, index) => (
//                                     <Picker.Item label={pStation.name} value={pStation.id} key={pStation.id} />
//                                 ))
//                             }
//                         </Picker>

//                         <View style={style.imageContainer}>
//                             {
//                                 imagesToSend.map((value, index) => (
//                                     <View key={index} style={style.imageWrapper}>
//                                         <Image style={style.imageEditReport} source={{ uri: value }} />
//                                         <TouchableOpacity onPress={() => removeImageToSend(index)}>
//                                             <Text style={style.removeText}>Remover</Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                 ))
//                             }
//                             {
//                                 imagesFromOcurrene.map((value, index) => (
//                                     <View key={index} style={style.imageWrapper}>
//                                         <Image style={style.imageEditReport} source={{ uri: value.path }} />
//                                         <TouchableOpacity onPress={() => removeImageFromOcurrence(index, value.id)}>
//                                             <Text style={style.removeText}>Remover</Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                 ))
//                             }
//                         </View>
//                         <TouchableOpacity
//                             onPress={handleSelectImages}
//                             style={style.updateImageButton}
//                         >
//                             <Image style={style.updateImageButtonIcon} source={imageIcon}></Image>
//                             <Text style={style.updateImageButtonText}>Adicionar imagens</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={style.reportButton} onPress={createOcurrence}>
//                             <Text style={style.reportButtonText}>Salvar</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </ScrollView>
//         </View>
//     )
// }

// const style = StyleSheet.create({
//   container: {
//     backgroundColor: "#F4FEF4",
//     height: "100%",
//   },
//   topContainer: {
//     alignItems: "center",
//   },
//   containerMessage: {
//     width: "85%",
//     height: 35,
//     backgroundColor: "#00B603",
//     position: "absolute",
//     top: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.5,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   message: {
//     color: "#fff",
//     fontFamily: "Montserrat_400Regular",
//   },
//   containerMap: {
//     width: "100%",
//     height: 300,
//   },
//   map: {
//     width: "100%",
//     height: "100%",
//   },
//   formContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 24,
//   },
//   formTitle: {
//     fontSize: 18,
//     fontFamily: "Montserrat_700Bold",
//     color: "#fff",
//   },
//   formDescription: {
//     fontFamily: "Montserrat_400Regular",
//     color: "#fff",
//     marginBottom: 20,
//   },
//   inputContainer: {
//     gap: 10,
//   },
//   genericInput: {
//     height: 55,
//     width: "100%",
//     backgroundColor: "#464646",
//     borderRadius: 5,
//     borderBottomColor: "#00B603",
//     borderBottomWidth: 5,
//     padding: 10,
//     color: "#fff",
//     fontFamily: "Montserrat_400Regular",
//     fontSize: 16,
//   },
//   dateInput: {
//     height: 55,
//     padding: 10,
//     backgroundColor: "#464646",
//     borderRadius: 5,
//     borderBottomColor: "#00B603",
//     borderBottomWidth: 5,
//     justifyContent: "center",
//   },
//   dateText: {
//     color: "#fff",
//     fontFamily: "Montserrat_400Regular",
//     fontSize: 16,
//   },
//   imageContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 10,
//     marginTop: 10,
//   },
//   imageWrapper: {
//     alignItems: "center",
//   },
//   imageEditReport: {
//     width: 64,
//     height: 64,
//     borderRadius: 10,
//   },
//   removeText: {
//     color: "#ff4d4d",
//     fontFamily: "Montserrat_700Bold",
//     marginTop: 5,
//   },
//   updateImageButton: {
//     height: 80,
//     padding: 10,
//     backgroundColor: "#464646",
//     borderRadius: 5,
//     borderColor: "#00B603",
//     borderBottomWidth: 5,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   updateImageButtonIcon: {
//     width: 20,
//     height: 20,
//   },
//   updateImageButtonText: {
//     color: "#fff",
//     fontFamily: "Montserrat_400Regular",
//   },
//   reportButton: {
//     width: "100%",
//     height: 55,
//     backgroundColor: "#00B603",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 5,
//   },
//   reportButtonText: {
//     color: "#fff",
//     fontFamily: "Montserrat_700Bold",
//   },
// });

// export default EditReport;

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
