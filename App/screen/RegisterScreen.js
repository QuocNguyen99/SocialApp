import React from 'react'
import { StyleSheet, ImageBackground, Text, View, Alert } from 'react-native';

import FormField from '../components/Form/FormField';
import * as Yup from 'yup';
import TextInputField from '../components/Form/TextInputField';
import ButtonSubmit from '../components/Form/ButtonSubmit'
import TextTouch from '../components/TextTouch'
import userApi from '../api/userApi';

const valaditionSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(5).label('Password'),
    displayname: Yup.string().required().min(1).label('Displayname')
})

export default function RegisterScreen({ navigation }) {

    const create = async (value) => {
        if (value.confirm.trim() !== value.password.trim()) return Alert.alert('Notification', 'Error Confirm Password');
        const newValue = {
            email: value.email,
            password: value.password,
            displayname: value.displayname
        };
        console.log();
        const { error, type } = await userApi.createUser(newValue);
        console.log('error', error);
        if (error) return Alert.alert('Notification', type ? type : 'Fail');
        navigation.navigate('LoginScreen');
    }

    return (
        <ImageBackground
            source={require('../../assets/bg.png')}
            style={styles.imgBackground}
        >
            <View style={styles.container}>
                <Text style={styles.textTitle}>REGISTER</Text>
                <FormField
                    initialValues={{ email: '', password: '', confirm: '', displayname: '' }}
                    onSubmit={(value) => create(value)}
                    validationSchema={valaditionSchema}
                >
                    <TextInputField
                        autoCapitalize='none'
                        name='email'
                        title='Email'
                        style={styles.textInput}
                        styleTitle={styles.textSubTitle}
                    />
                    <TextInputField
                        autoCapitalize='none'
                        name='password'
                        title='Password'
                        secureTextEntry={true}
                        style={styles.textInput}
                        styleTitle={styles.textSubTitle}
                    />
                    <TextInputField
                        autoCapitalize='none'
                        name='confirm'
                        title='Confirm Password'
                        secureTextEntry={true}
                        style={styles.textInput}
                        styleTitle={styles.textSubTitle}
                    />
                    <TextInputField
                        autoCapitalize='none'
                        name='displayname'
                        title='Displayname'
                        style={styles.textInput}
                        styleTitle={styles.textSubTitle}
                    />
                    <View style={styles.containerButton}>
                        <ButtonSubmit
                            title='SUBMIT'
                            style={styles.button}
                        />

                        <TextTouch
                            title="Have an account ? Login "
                            style={styles.text2}
                            onPress={() => navigation.navigate('LoginScreen')} />
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
    textInput: {

    },
    textTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#2661FA',
        marginBottom: 50,
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
