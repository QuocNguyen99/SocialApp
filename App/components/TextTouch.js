import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function TextTouch({ style, title, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <Text style={style}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})
