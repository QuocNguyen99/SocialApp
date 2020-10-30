import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function AppText({ children, style }) {
    return (
        <Text style={[styles.text, style]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Roboto-Regular'
    }
})
