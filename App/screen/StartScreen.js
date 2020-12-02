import React, { } from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native';

import Text from '../components/Text'

const width = Dimensions.get('screen').width;

export default function StartScreen({ navigation }) {

    const navigationToLogin = () => {
        navigation.navigate('LoginScreen')
    }
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.img} />
            <Text style={styles.title}>DOLPHIN</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'whitesmoke',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 25,
        fontFamily: 'Roboto-Bold',
        color: 'royalblue',
    },
    img: {
        width: width / 4
    }
})
