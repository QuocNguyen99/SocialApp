import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import ItemInput from '../../components/Post/ItemInput'
import Post from '../../components/Post/Post'

export default function HomeScreen() {
    return (
        <ScrollView>
            <ItemInput />
            <Post />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
})
