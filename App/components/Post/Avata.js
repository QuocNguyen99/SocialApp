import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default function Avata({ image }) {
    return (
        <View>
            {
                !image ?
                    <Image
                        style={styles.image}
                        source={
                            require('../../../assets/avataDefault.jpg')
                        } />
                    :
                    <Image
                        style={styles.image}
                        source={{
                            uri: image
                        }} />
            }
        </View>
    )
} 0

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        borderRadius: 25
    }
})
