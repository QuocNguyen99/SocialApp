import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Dimensions, TouchableHighlight } from 'react-native';

import postApi from '../../api/postApi';
import Avata from '../Post/Avata';
import Title from '../Title'

const { width, height } = Dimensions.get('screen');

export default function ProfileDetail({ navigation }) {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        listPost('5fbb6416cad4ec31e8b4641c')
    }, [])

    const listPost = async (id) => {
        try {
            const { error, data } = await postApi.listPostByIdUser(id);
            if (!error) {
                setPosts([...data])
            }
        } catch (error) {
            console.log('Error', error.message);
        }

    }
    return (
        <View style={styles.container} >
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.icon}
                    activeOpacity={0.7}
                    onPress={() => navigation.goBack()}>
                    {/* <Icon name='arrow-left' color='black' size={20} /> */}
                    <Image source={require('../../../assets/left-arrow-white.png')} />
                </TouchableOpacity>
                <Title title='Profile Detail' style={{ color: 'white', fontFamily: 'Roboto-Bold' }} />
            </View>
            <View style={styles.bodyContainer}>
                <TouchableHighlight
                    style={{ height: '25%' }}
                    underlayColor='blue'
                    onPress={() => alert('1')}>
                    <Image source={require('../../../assets/imagecover.png')} style={{ flex: 1, width: '100%' }} resizeMode='cover' />
                </TouchableHighlight>
                <View style={styles.avataContainer}>
                    <TouchableHighlight
                        underlayColor='gray'
                        onPress={() => alert('1')}>
                        <Avata styleImage={styles.avata} image='https://res.cloudinary.com/dp2rat4ch/image/upload/v1606648718/xqwgsggu99l0uvod18te.jpg' />
                    </TouchableHighlight>
                </View>
                <Title title='Huỳnh Quốc Nguyên' style={{ alignSelf: 'center', marginTop: 10, fontFamily: 'Roboto-Medium' }} />
                <Title title='Mobile developer' style={{ alignSelf: 'center', marginTop: 5, fontSize: 16, marginBottom: 10 }} />

                <View style={{ flexDirection: 'row', padding: 10, borderBottomColor: 'lightgray', borderBottomWidth: 1 }}>
                    <Image source={require('../../../assets/icon/cake.png')} />
                    <Title title={`Birthday 21/10/1999 `} style={{ marginTop: 5, marginLeft: 5, fontSize: 16 }} />
                </View>

                <View style={{ flexDirection: 'row', padding: 10, borderBottomColor: 'lightgray', borderBottomWidth: 1 }}>
                    <Image source={require('../../../assets/icon/work.png')} />
                    <Title title={`Work At Fpt Software`} style={{ marginTop: 5, marginLeft: 5, fontSize: 16 }} />
                </View>

                <View style={{ flexDirection: 'row', padding: 10, borderBottomColor: 'lightgray', borderBottomWidth: 1 }}>
                    <Image source={require('../../../assets/icon/work.png')} />
                    <Title title={`Study At Fpt Software`} style={{ marginTop: 5, marginLeft: 5, fontSize: 16 }} />
                </View>

            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    bodyContainer: {
        flex: 1
    },
    avataContainer: {
        width: 150,
        height: 150,
        marginTop: -70,
        borderRadius: 100,
        alignSelf: 'center',
        overflow: 'hidden'
        // borderColor: 'white',
        // borderWidth: 5
    },
    avata: {
        width: 150,
        height: 150,
        borderRadius: 100,
        alignSelf: 'center'
    },
    icon: {
        padding: 5,
        marginLeft: 5
    },
})
