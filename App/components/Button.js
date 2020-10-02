import React from 'react'
import { StyleSheet, Text, TouchableHighlight } from 'react-native'

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
        padding: 15,
        width: 250,
        marginVertical: 30,
        borderRadius: 25,
        elevation: 8
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
    }
})
