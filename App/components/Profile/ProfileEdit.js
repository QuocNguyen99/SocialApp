import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Platform, Button, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'

import Title from '../../components/Title';
import FormField from '../Form/FormField';
import TextInputField from '../Form/TextInputField';
import ButtonSubmit from '../Form/ButtonSubmit';
import userApi from '../../api/userApi'
import { connect } from 'react-redux';
import storage from '../../auth/storage';
import { Alert } from 'react-native';

const { width } = Dimensions.get('screen')

function ProfileEdit({ navigation, idUser }) {
    const [user, setUser] = useState({});
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);

    useEffect(() => {
        getUser(idUser)
    }, [])

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setUser({
            ...user,
            birthDay: moment(selectedDate).format('Do MMMM YYYY')
        })
    };
    const showDatepicker = () => {
        setShow(true);

    };


    const sumbitEdit = async (id, userUpdate) => {
        try {
            console.log(userUpdate);
            const token = await storage.getToken();
            const { error } = await userApi.changeInforUser(id, userUpdate, token);
            if (!error) {
                Alert.alert('Edit Profile', 'Successful', [
                    { text: 'Go back', onPress: () => navigation.goBack() },
                    { text: 'Continue' }
                ]);
            }
        } catch (error) {
            console.log('Edit', error.message);
        }
    }

    const getUser = async (id) => {
        try {
            const { error, data } = await userApi.getInfoUser(id);
            if (!error) {
                setUser(data)
            }
        } catch (error) {
            console.log('User', error.message);
        }
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
                <Title title='Profile Edit' style={{ color: 'white', fontFamily: 'Roboto-Bold' }} />
            </View>
            <View style={styles.bodyContainer}>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode='date'
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
                <FormField
                    initialValues={{ displayName: '', bio: '', birthDay: '', studyAt: '', workAt: '' }}
                    onSubmit={() => sumbitEdit(idUser, user)}
                >
                    {/* <TextInput
                        value={user.bio}
                        onChangeText={() => console.log(0)}
                    /> */}
                    <TextInputField
                        value={user.bio}
                        autoCapitalize='none'
                        styleTitle={styles.textSubTitle}
                        name='bio'
                        title='Bio'
                        multiline
                        handleChangeState={(text) => setUser({
                            ...user,
                            bio: text
                        })}
                    />

                    <TextInputField
                        value={user.displayName}
                        autoCapitalize='none'
                        styleTitle={styles.textSubTitle}
                        name='displayName'
                        title='Full Name'
                        multiline
                        handleChangeState={(text) => setUser({
                            ...user,
                            displayName: text
                        })}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInputField
                            value={user.birthDay ? user.birthDay : moment(date).format('Do MMMM YYYY')}
                            autoCapitalize='none'
                            styleTitle={styles.textSubTitle}
                            name='birthday'
                            title='Birthday'
                            multiline
                            editable={false}
                            style={{ width: width / 2 }}
                        />
                        <TouchableOpacity
                            onPress={showDatepicker}
                        >
                            <Image source={require('../../../assets/icon/calendar.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    </View>


                    <TextInputField
                        value={user.studyAt}
                        autoCapitalize='none'
                        styleTitle={styles.textSubTitle}
                        name='studyAt'
                        title='Study at'
                        multiline
                        handleChangeState={(text) => setUser({
                            ...user,
                            studyAt: text
                        })}
                    />

                    <TextInputField
                        value={user.workAt}
                        autoCapitalize='none'
                        styleTitle={styles.textSubTitle}
                        name='workAt'
                        title='Work at'
                        multiline
                        handleChangeState={(text) => setUser({
                            ...user,
                            workAt: text
                        })}
                    />
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

export default connect(mapStateToProps)(ProfileEdit)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bodyContainer: {
        marginHorizontal: 20
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
    containerButton: {
        alignSelf: 'flex-end',
    },
    icon: {
        padding: 5,
    },
    textSubTitle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 20
    },
    button: {
        alignSelf: 'flex-end'
    },
})
