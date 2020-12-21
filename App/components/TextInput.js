import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native';

export default function AppTextInput({ style, stylesContainer, ...otherProps }) {

    return (
        <View style={[styles.container, stylesContainer]}>
            <TextInput style={[styles.textInput, style]} {...otherProps} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: '#96B2FC',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    textInput: {
        width: '100%',
        paddingVertical: 10,
        fontSize: 20
    },
})
