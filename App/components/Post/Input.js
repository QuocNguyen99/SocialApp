import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

export default function AppInput({ style, styleInput, ...otherProps }) {
    console.log('123');
    return (
        <View style={[styles.containerInput, style]} >
            <TextInput style={[styles.input]} {...otherProps} />
        </View>
    )
}

const styles = StyleSheet.create({
    containerInput: {
        borderColor: 'gray',
        backgroundColor: 'blue',
        borderWidth: 1,
        borderRadius: 30
    },
    input: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        overflow: 'hidden'
    }
})
