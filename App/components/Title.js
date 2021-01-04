import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Title({ title, style, ...otherProps }) {
    return (
        <Text style={[styles.title, style]}  {...otherProps}>{title}</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontFamily: 'Roboto-Regular',
        color: 'black'
    }
})
