import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default function Avata({ image, styleImage }) {
    return (
        <View>
            {
                !image ?
                    <Image
                        style={[styles.image, styleImage]}
                        source={
                            require('../../../assets/avataDefault.jpg')
                        } />
                    :
                    <Image
                        style={[styles.image, styleImage]}
                        source={{
                            uri: image
                        }} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 40,
        height: 40,
        borderRadius: 25
    }
})
