import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';

import Button from '../components/Button'
import TextInput from '../components/TextInput';
import TextTouch from '../components/TextTouch';

export default function LoginScreen() {

    const handelLogin = () => { }

    const handelToSignUp = () => { }

    return (
        <ImageBackground
            source={require('../../assets/bg.png')}
            style={styles.imgBackground}
        >
            <View style={styles.container}>
                <Text style={styles.textTitle}>LOGIN</Text>

                <Text style={styles.textSubTitle}>Username</Text>
                <TextInput />

                <Text style={styles.textSubTitle}>Password</Text>
                <TextInput secureTextEntry={true} />

                <View style={styles.containerButton}>
                    <Button
                        title='Login'
                        style={styles.button}
                        onPress={handelLogin} />

                    <TextTouch style={styles.text2} onPress={handelToSignUp} title="Don't have an account? Sign up " />
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 200
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 40
    },
    containerButton: {
        alignSelf: 'flex-end'
    },
    textTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#2661FA',
        marginBottom: 50
    },
    textSubTitle: {
        color: '#799DFC',
        fontSize: 15,
        marginVertical: 10
    },
    text2: {
        color: 'blue',
        marginTop: -15
    },
    imgBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
    }
})
