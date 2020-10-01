import React from 'react'
import { StyleSheet, ImageBackground, Text, View, Image } from 'react-native';

import FormField from '../components/Form/FormField';
import * as Yup from 'yup';
import TextInputField from '../components/Form/TextInputField';

const valaditionSchema = '123123'

export default function RegisterScreen() {
    return (
        <ImageBackground
            source={require('../../assets/bg.png')}
            style={styles.imgBackground}
        >
            <View style={styles.container}>
                <Text style={styles.textTitle}>Register</Text>
                <FormField
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(value) => { console.log(value) }}

                >
                    <TextInputField
                        name='email'
                        title='Email'
                        style={styles.textInput}
                        styleTitle={styles.textSubTitle}
                    />
                    <TextInputField
                        name='password'
                        title='Password'
                        secureTextEntry={true}
                        style={styles.textInput}
                        styleTitle={styles.textSubTitle}
                    />
                    <TextInputField
                        name='displayName'
                        title='Displayname'
                        style={styles.textInput}
                        styleTitle={styles.textSubTitle}
                    />
                </FormField>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 40
    },
    textInput: {
        fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : 'ArialHebrew-Light'
    },
    textTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#2661FA',
        marginBottom: 50,
    },
    textSubTitle: {
        color: '#799DFC',
        fontSize: 15,
        marginVertical: 10
    },
    imgBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
    }
})
