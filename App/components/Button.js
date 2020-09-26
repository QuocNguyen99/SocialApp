import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'

export default function AppButton({ title, style, onPress }) {
    return (
        <TouchableHighlight
            style={[styles.button, style]}
            underlayColor='orange'
            onPress={onPress}
        >

            <Text style={styles.text}>{title}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "darkorange",
        padding: 10,
        marginVertical: 30,
        borderRadius: 25
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,

    }
})
