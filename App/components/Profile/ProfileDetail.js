import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Dimensions, TouchableHighlight, ScrollView } from 'react-native';

import postApi from '../../api/postApi';
import Avata from '../Post/Avata';
import Title from '../Title';
import ItemPost from '../../components/Post/ItemPost'
import ItemInput from '../Post/ItemInput';
import userApi from '../../api/userApi';

const { width, height } = Dimensions.get('screen');

export default function ProfileDetail({ navigation, route }) {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState();
    const item = route.params.item
    useEffect(() => {
        listPost(item._id);
        getUser(item._id)
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
                    {/* <Icon name='arrow-left' color='black' size={20} /> */}
                    <Image source={require('../../../assets/left-arrow-white.png')} />
                </TouchableOpacity>
                <Title title='Profile Detail' style={{ color: 'white', fontFamily: 'Roboto-Bold' }} />
            </View>
            <ScrollView>
                <View style={styles.bodyContainer}>
                    <TouchableHighlight
                        // style={{ height: '25%' }}
                        underlayColor='blue'
                        onPress={() => alert('1')}>
                        <Image source={require('../../../assets/imagecover.png')} style={{ width: width, height: height / 4 }} resizeMode='cover' />
                    </TouchableHighlight>
                    <View style={styles.avataContainer}>
                        <TouchableHighlight
                            underlayColor='gray'
                            onPress={() => alert('1')}>
                            <Avata styleImage={styles.avata} image={user.image} />
                        </TouchableHighlight>
                    </View>
                    <Title title={user.displayName} style={{ alignSelf: 'center', marginTop: 10, fontFamily: 'Roboto-Medium' }} />
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

                    <View style={{ backgroundColor: 'white', marginTop: 10 }}>
                        <Title title='Post' style={{ fontSize: 20, fontFamily: 'Roboto-Bold', marginVertical: 5, marginLeft: 20 }} />
                        <ItemInput />
                    </View>
                    {
                        posts.map((e, i) => (
                            <ItemPost key={i} item={e} />
                        ))
                    }
                </View>
            </ScrollView>
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