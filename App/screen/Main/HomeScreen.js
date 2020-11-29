import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import ItemInput from '../../components/Post/ItemInput'
import Post from '../../components/Post/Post'

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <ItemInput />
            <Post />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
