import React from 'react'
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AppIcon({ name, color = 'black', size = 25 }) {
    return (
        <Icon name={name} color={color} size={size} />
    )
}

const styles = StyleSheet.create({

})
