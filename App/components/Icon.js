import React from 'react'
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AppIcon({ name, color, size, style, onPress }) {
    return (
        <View style={styles.container}>
            <Icon name={name} color={color} size={size} style={style} onPress={onPress} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
