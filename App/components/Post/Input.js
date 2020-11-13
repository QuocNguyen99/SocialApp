import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

export default function AppInput({ placeholder, style, otherProps }) {
    return (
        <View style={[styles.containerInput, style]} >
            <TextInput placeholder={placeholder} style={styles.input} {...otherProps} />
        </View>
    )
}

const styles = StyleSheet.create({
    containerInput: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 30,
    },
    input: {
        paddingVertical: 5,
        paddingHorizontal: 20
    }
})
