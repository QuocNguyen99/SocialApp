import React, { useState } from 'react'
import { StyleSheet, View, Animated } from 'react-native'

import ItemInput from '../../components/Post/ItemInput'
import Post from '../../components/Post/Post';
import Header from '../../components/Header';

export default function HomeScreen() {

    const handelOnScroll = (e) => {

    }

    return (
        <View style={styles.container}>
            <Header />
            <ItemInput />
            <Post handelOnScroll={() => handelOnScroll} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
