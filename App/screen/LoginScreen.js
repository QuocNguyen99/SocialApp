import React from 'react'
import { ImageBackground, StyleSheet, Text, View, Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Button from '../components/Button'
import ErrorMessage from '../components/Form/ErrorMessage';
import TextInput from '../components/TextInput';
import TextTouch from '../components/TextTouch'

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

                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(value) => alert(JSON.stringify(value))}
                    validationSchema={validationSchema}

                >
                    {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                        <>
                            <Text style={styles.textTitle}>LOGIN</Text>

                            <Text style={styles.textSubTitle}>Username</Text>
                            <TextInput
                                onBlur={() => setFieldTouched('email')}
                                style={styles.textInput}
                                onChangeText={handleChange('email')} />

                            <ErrorMessage error={errors.email} visible={touched.email} />

                            <Text style={styles.textSubTitle}>Password</Text>
                            <TextInput
                                onBlur={() => setFieldTouched('password')}
                                style={styles.textInput}
                                secureTextEntry={true}
                                onChangeText={handleChange('password')} />

                            <ErrorMessage error={errors.password} visible={touched.password} />

                            <View style={styles.containerButton}>
                                <Button
                                    title='Login'
                                    style={styles.button}
                                    onPress={handleSubmit} />

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
