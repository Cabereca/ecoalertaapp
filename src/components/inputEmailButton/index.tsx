import { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

const InputEmailButton = ({title, place, state, valueEmail}) => {
    return(
        <View>
            <Text style={styles.title}> {title}:</Text>
            <TextInput 
                style={styles.input} 
                onChangeText={state} 
                value={valueEmail} 
                placeholder={place} 
                placeholderTextColor="#949191"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        fontFamily: "Montserrat_700Bold",
        marginBottom: 5,
        color: "#343434",
        fontSize: 18
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
    }
})

export { InputEmailButton };