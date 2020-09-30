import React from 'react'
import { ImageBackground, StyleSheet, Text, View, Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import ButtonSubmit from '../components/Form/ButtonSubmit'
import TextTouch from '../components/TextTouch'
import TextInputField from '../components/Form/TextInputField';


const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(6).label('Password')
})

export default function LoginScreen() {
    return (
        <ImageBackground
            source={require('../../assets/bg.png')}
            style={styles.imgBackground}
        >
            <View style={styles.container}>
                <Text style={styles.textTitle}>LOGIN</Text>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(value) => alert(JSON.stringify(value))}
                    validationSchema={validationSchema}

                >
                    {() => (
                        <>
                            <TextInputField
                                style={styles.textInput}
                                styleTitle={styles.textSubTitle}
                                name='email'
                                title='Username'
                            />

                            <TextInputField
                                style={styles.textInput}
                                styleTitle={styles.textSubTitle}
                                name='password'
                                title='Password'
                            />

                            <View style={styles.containerButton}>
                                <ButtonSubmit
                                    title='Login'
                                    style={styles.button}
                                />

                                <TextTouch
                                    title="Don't have an account? Sign up "
                                    style={styles.text2}
                                    onPress={() => { console.log('Tapped') }} />
                            </View>
                        </>
                    )
                    }
                </Formik>
            </View>
        </ImageBackground >
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
        marginBottom: 50,

    },
    textSubTitle: {
        color: '#799DFC',
        fontSize: 15,
        marginVertical: 10
    },
    textInput: {
        fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : 'ArialHebrew-Light'
    },
    text2: {
        color: 'blue',
    },
    imgBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
    }
})
