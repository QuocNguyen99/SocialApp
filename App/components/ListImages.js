import React from 'react'
import { StyleSheet, Image, TouchableWithoutFeedback, Alert } from 'react-native'

export default function ListImages({ images, style, removeImage }) {
    console.log('Render');
    return (
        <>
            {
                images.length > 0 ?
                    images.map((image, i) => (
                        <TouchableWithoutFeedback
                            key={i}
                            onPress={() => removeImage(i)}>
                            <Image source={{ uri: image }} style={styles.image} />
                        </TouchableWithoutFeedback>
                    ))
                    : null
            }
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 80,
        width: 80,
        borderRadius: 10,
        marginRight: 5
    },
})
