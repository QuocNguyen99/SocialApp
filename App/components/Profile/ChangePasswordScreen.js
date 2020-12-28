import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';

import FormField from '../Form/FormField';
import TextInputField from '../Form/TextInputField';
import ButtonSubmit from '../Form/ButtonSubmit';
import Title from '../../components/Title';
import userApi from '../../api/userApi';
import { Alert } from 'react-native';
import storage from '../../auth/storage';
import { removeUser } from '../../redux/action';

const { width } = Dimensions.get('screen')

function ChangePassword({ navigation, idUser, removeInforUser }) {
    const [showPass, setShowPass] = useState(true);
    const [showNewPass, setShowNewPass] = useState(true);
    // const [pass, setPass] = useState('');
    // const [newPass, setNewPass] = useState('');

    const changePass = async (id, oldPass, newPass) => {
        const token = await storage.getToken();
        const { error, message } = await userApi.changePassword(id, oldPass, newPass, token);
        if (error) {
            Alert.alert('Change password', message)
        } else {
            Alert.alert('Change password', 'Sucess and login again', [{
                text: 'Login again',
                onPress: async () => {
                    removeInforUser();
                    await storage.removeToken();
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                { name: 'LoginScreen' },
                            ],
                        })
                    );
                    navigation.navigate('LoginScreen')
                }
            }])

        }
    }

    const handleShowPass = () => {
        setShowPass(!showPass)
    }

    const handleShowNewPass = () => {
        setShowNewPass(!showNewPass)
    }
    return (
        <View style={styles.container} >
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.icon}
                    activeOpacity={0.7}
                    onPress={() => navigation.goBack()}>
                    <Image source={require('../../../assets/left-arrow-white.png')} />
                </TouchableOpacity>
                <Title title='Change Password' style={{ color: 'white', fontFamily: 'Roboto-Bold' }} />
            </View>
            <View style={styles.bodyContainer}>
                <FormField
                    initialValues={{ password: '', newPassword: '' }}
                    onSubmit={(value) => {
                        changePass(idUser, value.password, value.newPassword)
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInputField
                            autoCapitalize='none'
                            secureTextEntry={showPass}
                            style={{ width: width / 1.2 }}
                            styleTitle={styles.textSubTitle}
                            name='password'
                            title='Old Password'
                        />
                        <TouchableOpacity
                            onPress={() => handleShowPass()}
                        >
                            {
                                showPass ?
                                    <Image source={require('../../../assets/icon/hiden.png')} style={{ width: 30, height: 30 }} />
                                    :
                                    <Image source={require('../../../assets/icon/show.png')} style={{ width: 30, height: 30 }} />

                            }
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInputField
                            autoCapitalize='none'
                            secureTextEntry={showNewPass}
                            style={{ width: width / 1.2 }}
                            styleTitle={styles.textSubTitle}
                            name='newPassword'
                            title='New Password'
                        />

                        <TouchableOpacity
                            onPress={() => handleShowNewPass()}>
                            {
                                showNewPass ?
                                    <Image source={require('../../../assets/icon/hiden.png')} style={{ width: 30, height: 30 }} />
                                    :
                                    <Image source={require('../../../assets/icon/show.png')} style={{ width: 30, height: 30 }} />

                            }
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerButton}>
                        <ButtonSubmit
                            title='SUBMIT'
                            style={styles.button}
                        />

                    </View>
                </FormField>
            </View>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        idUser: state.user.infoUser._id
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeInforUser: () => dispatch(removeUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bodyContainer: {
        marginHorizontal: 20,
        marginTop: 20
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        backgroundColor: '#1E90FF'
    },
    textSubTitle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 20
    },
    containerButton: {
        alignSelf: 'flex-end',
    },
    button: {
        marginTop: 10,
        alignSelf: 'flex-end'
    },
    icon: {
        padding: 5,
    },
})

