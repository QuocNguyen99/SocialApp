import React, { useState } from 'react'
import { StyleSheet, View, Animated } from 'react-native'

import ItemInput from '../../components/Post/ItemInput'
import Post from '../../components/Post/Post'

export default function HomeScreen() {
    const scrollY = new Animated.Value(0)
    const diffClamp = Animated.diffClamp(scrollY, 0, 100)
    const translateY = diffClamp.interpolate({
        inputRange: [0, 100],
        outputRange: [0, -100]
    })
    const handelOnScroll = (e) => {
        scrollY.setValue(e.nativeEvent.contentOffset.y)
    }

    return (
        <View style={styles.container}>
            <Animated.View
                style={{
                    transform: [
                        { translateY: translateY }
                    ],
                    elevation: 4,
                    zIndex: 60
                }}>
                <ItemInput />
            </Animated.View>
            <Post handelOnScroll={() => handelOnScroll} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
