import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Input from './Input';

import Avata from './Avata'

export default function ItemInput() {
    return (
        <View style={styles.container}>
            <Avata image='' />
            <Input placeholder='What are you thinking?' style={styles.input} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    input: {
        marginLeft: 15
    }
})
