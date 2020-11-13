import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Avata from './Avata'

export default function ItemPost({ url, name, time, content }) {
    const [height, setHeight] = useState();
    useEffect(() => {
        Image.getSize(
            'https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.0-9/36762009_489593304810529_4217376718932934656_n.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_ohc=HlpGtuYL9ooAX9ML2xe&_nc_ht=scontent.fsgn5-5.fna&oh=60e7c6876f08ade9fbf2c68ddde15c04&oe=5FD386D1',
            async (width, height) => {
                await setHeight(height)
            }
        )
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Avata />
                <View style={styles.subContainer}>
                    <Text style={styles.name}>Huỳnh Quốc Nguyên</Text>
                    <Text style={styles.time}>7 giờ trước</Text>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.content}>Today I feel so good</Text>
            </View>
            <Image
                resizeMode='stretch'
                style={{
                    height: height,
                }}
                source={{
                    uri: 'https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.0-9/36762009_489593304810529_4217376718932934656_n.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_ohc=HlpGtuYL9ooAX9ML2xe&_nc_ht=scontent.fsgn5-5.fna&oh=60e7c6876f08ade9fbf2c68ddde15c04&oe=5FD386D1',
                }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        //backgroundColor: 'blue',
        paddingTop: 10
    },
    contentContainer: {
        margin: 10,
    },
    subContainer: {
        marginLeft: 10
    },
    header: {
        paddingHorizontal: 20,
        flexDirection: 'row'
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    time: {
        color: 'gray'
    },
    content: {
        fontFamily: 'Roboto-Light',
        color: 'black',
        fontSize: 18
    }
})
