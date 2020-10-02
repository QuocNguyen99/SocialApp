import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';

import Button from '../components/Button'

export default function StartScreen() {
    return (
        <View style={{ flex: 1 }}>
            <Image
                source={require('../../assets/icon.png')}
                style={{ alignSelf: 'flex-end', alignSelf: 'center', marginVertical: 50, width: 300, height: 300 }} />
            <View style={{ flexDirection: 'column', marginTop: 100, marginHorizontal: 100 }}>
                <Button />
                <Button />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
