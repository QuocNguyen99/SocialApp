import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function AppTextInput({ style, ...otherProps }) {
    return (
        <View style={styles.container}>
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
    icon: {
        marginLeft: 20
    },
    textInput: {
        width: '100%',
        paddingVertical: 15,
        fontSize: 20
    },
})
