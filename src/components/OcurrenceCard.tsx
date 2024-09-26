import Ionicons from '@expo/vector-icons/Ionicons';
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ocurrence from "../interfaces/Ocurrence";
import api from '../api/api';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
    ocurrence: Ocurrence,
    onDeleteOcurrence: () => void
}

type NagivigationProps = NativeStackNavigationProp<ParamListBase, "OcurrenceCard">;

const OcurrenceCard = ({ ocurrence, onDeleteOcurrence }: Props): React.JSX.Element => {
    const navigation = useNavigation<NagivigationProps>();

    const handleDelete = () => {
        Alert.alert("Excluir reporte", "Tem certeza que deseja excluir esse reporte?", [
            {
                text: "Não",
                style: "cancel"
            },
            {
                isPreferred: true,
                text: "Sim",
                onPress: onDeleteOcurrence,
                style: "default"
            }
        ])
    }

    return (
        <View style={styles.OcurrenceCard}>
            <View style={styles.Info}>
                <View style={styles.Header}>
                    {/* <View style={styles.Badge}>
                        <Text style={styles.Text}>{ocurrence.title}</Text>
                    </View> */}
                    <View></View>
                    <TouchableOpacity style={styles.DeleteButton} onPress={handleDelete}>
                        <Ionicons
                            name={"trash-sharp"}
                            color={'white'}
                            size={16}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.Title}>{ocurrence.title}</Text>
                <View>
                    <Text style={styles.Text}>{(new Date(ocurrence.dateTime)).toLocaleDateString()}</Text>
                    <Text style={styles.Text}>{ocurrence.description.length > 140 ? `${ocurrence.description.substring(0, 140).trim()}...` : ocurrence.description}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Editar Ocorrência', {ocurrence} )}>
                <Text style={styles.Text}>Editar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    OcurrenceCard: {
        borderColor: "#00B603",
        borderTopWidth: 5,
        backgroundColor: "#464646",
        width: 277,
        height: 209,
        alignSelf: "center",
        padding: 7,
        paddingLeft: 15,
        paddingBottom: 12,
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 3.5
    },
    Badge: {
        width: 68,
        height: 20,
        borderRadius: 3,
        backgroundColor: "#00B603",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
    },
    Header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    DeleteButton: {
        width: 26,
        height: 26,
        backgroundColor: '#F24E1E',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Info: {
        width: "100%",
    },
    Title: {
        fontFamily: "Montserrat_700Bold",
        fontSize: 16,
        fontWeight: "600",
        color: "#FFFFFF",
        marginBottom: 10
    },
    Text: {
        fontSize: 9.89,
        fontWeight: "400",
        color: "#FFFFFF"
    },
    button: {
        width: "100%",
        backgroundColor: "#00B603",
        height: 30,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default OcurrenceCard;