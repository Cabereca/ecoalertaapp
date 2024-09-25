import { StyleSheet, Text, TextInput, View } from "react-native";

const Input = ({title, placeholder, onChange, value}) => {
    return(
        <View>
            <Text style={styles.title}> {title}:</Text>
            <TextInput 
                style={styles.input} 
                onChangeText={onChange} 
                value={value} 
                placeholder={placeholder} 
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
        backgroundColor: "#F4FEF4",
        borderRadius: 5,
        borderBottomColor: "#00B603",
        borderBottomWidth: 5,
        padding: 10,
        color: "#343434",
        fontFamily: "Montserrat_400Regular",
    }
})

export { Input };
