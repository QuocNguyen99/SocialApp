import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Platform, Dimensions, Alert, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';

import Title from '../../components/Title';
import FormField from '../Form/FormField';
import TextInputField from '../Form/TextInputField';
import ButtonSubmit from '../Form/ButtonSubmit';
import userApi from '../../api/userApi'
import storage from '../../auth/storage';
import Avata from '../Post/Avata';

const { width } = Dimensions.get('screen')

function ProfileEdit({ navigation, idUser }) {
    const [user, setUser] = useState({});
    const [avataTemp, setAvataTemp] = useState(null);
    const [imageCoverTemp, setImageCoverTemp] = useState(null);
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);
    console.log(avataTemp);
    console.log(imageCoverTemp);

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

    const options = {
        title: 'Choose Image',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        saveToPhotos: true,
        quality: 0.5
    };

    const openLibary = (type) => {
        return ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = `data:image/png;base64,${response.data}`
                if (type == 'avata') {
                    setAvataTemp(source);
                }
                else {
                    setImageCoverTemp(source)
                }
            }
        });
    }

    const editAvata = (type) => {
        openLibary(type);
    }
    const editImageCover = (type) => {
        openLibary(type);
    }

    const removeAvataEdit = () => {
        if (!avataTemp) {
            setUser({ ...user, image: 'https://res.cloudinary.com/dp2rat4ch/image/upload/v1608031982/avataDefault_obmgcb.gif' })
        } else {
            setAvataTemp('');
        }
    }

    const removeImageCoverEdit = () => {
        if (!imageCoverTemp) {
            setUser({ ...user, imageCover: 'https://res.cloudinary.com/dp2rat4ch/image/upload/v1608033503/imagecover_fd4dcs.png' })
        } else {
            setImageCoverTemp('');
        }
    }

    const sumbitEdit = async (id, userUpdate, avataTemp, imageCoverTemp) => {
        try {
            const token = await storage.getToken();
            // await updateAvata(idUser, avataTemp, userUpdate.image);
            // await updateImageCover(idUser, imageCoverTemp, userUpdate.imageCover)
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

    const updateAvata = async (id, avataUpdate, avataCurrent) => {
        try {
            const token = await storage.getToken();
            const { error } = await userApi.changeAvataUser(id, avataUpdate, avataCurrent, token);
        } catch (error) {
            console.log('UpdateAvata', error.message);
        }
    }
    const updateImageCover = async (id, imageCoverUpdate, imageCoverCurrent) => {
        try {
            const token = await storage.getToken();
            const { error } = await userApi.changeImageCoverUser(id, imageCoverUpdate, imageCoverCurrent, token);
        } catch (error) {
            console.log('UpdateImage', error.message);
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
            <ScrollView>
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 }}>
                        <View>
                            <Avata image={avataTemp ? avataTemp : user.image} styleImage={{ width: 100, height: 100, borderRadius: 50 }} />
                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={{ position: 'absolute', top: 0, right: 0 }}
                                onPress={() => removeAvataEdit()}
                            >
                                <Image source={require('../../../assets/icon/cancel-2.png')} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                        </View>

                        <Button
                            buttonStyle={{ width: 150 }}
                            title="Edit Avata"
                            onPress={() => editAvata('avata')}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 20 }}>
                        <View>
                            <Image source={{ uri: imageCoverTemp ? imageCoverTemp : user.imageCover }} style={{ width: 100, height: 100 }} />
                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={{ position: 'absolute', top: 0, right: 0 }}
                                onPress={() => removeImageCoverEdit()}
                            >
                                <Image source={require('../../../assets/icon/cancel-2.png')} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                        </View>

                        <Button
                            buttonStyle={{ width: 150 }}
                            title="Edit Cover Image"
                            onPress={() => editImageCover('imageCover')}
                        />
                    </View>

                    <FormField
                        initialValues={{ displayName: '', bio: '', birthDay: '', studyAt: '', workAt: '' }}
                        onSubmit={() => {
                            sumbitEdit(idUser, user, avataTemp, imageCoverTemp),
                                updateAvata(idUser, avataTemp, user.image),
                                updateImageCover(idUser, imageCoverTemp, user.imageCover)
                        }}
                    >
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
            </ScrollView>
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
        marginTop: 10,
        alignSelf: 'flex-end'
    },
    button: {
        marginTop: 10,
        alignSelf: 'flex-end'
    },
})
