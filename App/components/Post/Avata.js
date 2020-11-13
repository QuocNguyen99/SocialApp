import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default function Avata({ image }) {
    return (
        <View>
            <Image
                style={styles.image}
                source={{
                    uri: 'https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.0-9/36762009_489593304810529_4217376718932934656_n.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_ohc=HlpGtuYL9ooAX9ML2xe&_nc_ht=scontent.fsgn5-5.fna&oh=60e7c6876f08ade9fbf2c68ddde15c04&oe=5FD386D1',
                }} />
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
