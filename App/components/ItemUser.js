import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';

import Avatar from './Post/Avata';

export default function ItemUser({ item }) {
    const { displayName, image } = item
    return (
        <View style={styles.container}>
            <Avatar image={image} />
            <View style={styles.subContainer}>
                <Text style={{ marginLeft: 15, fontFamily: 'Roboto-Bold' }}>{displayName}</Text>
                <View style={styles.rightContainer}>
                    <Image source={require('../../assets/icon/offline.png')} style={{ width: 12, height: 12 }} />
                    <Text style={{ marginLeft: 5 }}>offline</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        borderBottomColor: 'black',
    },
    subContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    }
})
