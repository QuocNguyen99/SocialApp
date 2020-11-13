import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import ItemInput from '../../components/Chat/ItemInput'

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <ItemInput />
            <View style={{ flex: 7 }}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
