import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function ErrorMessage({ error, visible }) {
    if (!visible || !error) return null;
    return (
        <Text style={styles.text}>{error}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'red'
    }
})
