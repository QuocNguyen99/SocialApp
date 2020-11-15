import React from 'react'
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AppIcon({ name, color = 'gray', size = 25, style }) {
    return (
        <Icon name={name} color={color} size={size} style={style} />
    )
}

const styles = StyleSheet.create({

})
