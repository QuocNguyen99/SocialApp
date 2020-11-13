import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ItemPost from './ItemPost'


export default function Post() {
    return (
        <View style={styles.container}>
            <ItemPost />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 7
    }
})
