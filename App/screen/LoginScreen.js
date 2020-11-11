import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Platform, Image, Dimensions } from 'react-native';
import FormField from '../components/Form/FormField'
import * as Yup from 'yup';

import ButtonSubmit from '../components/Form/ButtonSubmit'
import TextTouch from '../components/TextTouch'
import TextInputField from '../components/Form/TextInputField';
import userApi from '../api/userApi';


const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(6).label('Password')
})



export default function LoginScreen({ navigation }) {

    const loginUser = async (value) => {
        try {
            const result = await userApi.login(value);
            if (!result) return console.log('Fail Login');
            console.log('Token', result);
        } catch (error) {
            console.log('Fail:', error);
        }
    }

    return (
        <ImageBackground
            source={require('../../assets/bg.png')}
            style={styles.imgBackground}
        >
            <View style={styles.container}>
                <Text style={styles.textTitle} >LOGIN</Text>

                <FormField
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(value) => loginUser(value)}
                    validationSchema={validationSchema}
                >
                    <TextInputField
                        autoCapitalize='none'
                        styleTitle={styles.textSubTitle}
                        name='email'
                        title='Email'
                    />

                    <TextInputField
                        autoCapitalize='none'
                        secureTextEntry={true}
                        styleTitle={styles.textSubTitle}
                        name='password'
                        title='Password'
                    />

                    <View style={styles.containerButton}>
                        <ButtonSubmit
                            title='SUBMIT'
                            style={styles.button}
                        />

                        <TextTouch
                            title="Don't have an account? Sign up "
                            style={styles.text2}
                            onPress={() => navigation.navigate('RegisterScreen')} />
                    </View>
                </FormField>
            </View>
        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-end'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 40
    },
    containerButton: {
        alignSelf: 'flex-end',
    },
    textTitle: {
        fontSize: 30,
        color: '#2661FA',
        marginBottom: 40,
        fontFamily: 'Roboto-Bold'
    },
    textSubTitle: {
        color: '#799DFC',
        fontSize: 15
    },
    text2: {
        color: 'blue',
        alignSelf: 'flex-end'
    },
    imgBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
    }
})
