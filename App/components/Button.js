import React from 'react'
import { StyleSheet, Text, TouchableHighlight, Dimensions } from 'react-native'

const width = Dimensions.get('screen').width;

export default function AppButton({ title, style, onPress }) {
    return (
        <TouchableHighlight
            style={[styles.button, style]}
            underlayColor='lightskyblue'
            onPress={onPress}
        >

            <Text style={styles.text}>{title}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "dodgerblue",
        padding: 10,
        width: width / 3,
        marginVertical: 30,
        borderRadius: 25,
        elevation: 8,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase'
    }
})
