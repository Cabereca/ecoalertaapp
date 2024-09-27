import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const InputPasswordButton = ({title, place, state, valuePassword}) => {
    const [status, onChangeStatus] = useState(true);

    const handleStatus = () => {
        onChangeStatus(!status);
    }

    return(
        <View>
            <Text style={style.title}> {title}:</Text>
            <View style={style.containerInput}>
                <TextInput 
                    style={style.input} 
                    onChangeText={state} 
                    value={valuePassword} 
                    placeholder={place} 
                    placeholderTextColor="#949191"
                    secureTextEntry={status}    
                />
                <TouchableOpacity onPress={handleStatus} style={style.passIcon}>
                    {status ? <Ionicons name="eye-off" color="#00B603" size={23} /> : <Ionicons name="eye" color="#00B603" size={23} />}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    title: {
        fontFamily: "Montserrat_700Bold",
        marginBottom: 5,
        color: "#343434",
        fontSize: 18
    },
    containerInput: {
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        height: 55,
        width: "100%",
        borderRadius: 5,
        borderBottomColor: "#00B603",
        borderBottomWidth: 5,
        padding: 10,
        color: "#343434",
        fontFamily: "Montserrat_400Regular",
    },
    passIcon: {
        position: 'absolute',
        right: 30,
        height: 24,
        width: 24,
        tintColor: '#343434',
    }
})

export { InputPasswordButton };
