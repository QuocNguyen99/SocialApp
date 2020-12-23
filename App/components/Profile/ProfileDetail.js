import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Dimensions, TouchableHighlight, Text, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import postApi from '../../api/postApi';
import Avata from '../Post/Avata';
import Title from '../Title';
import ItemPost from '../../components/Post/ItemPost'
import ItemInput from '../Post/ItemInput';
import userApi from '../../api/userApi';

const { width, height } = Dimensions.get('screen');

function ProfileDetail({ navigation, route, idUserRedux }) {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const [refreshing, setRefreshing] = useState(false)
    const idUser = route.params.idUser;
    useEffect(() => {
        listPost(idUser);
    }, [])

    useEffect(() => {
        getUser(idUser)
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
                console.log('Data', data.imageCover);
                setUser(data)
            }
        } catch (error) {
            console.log('User', error.message);
        }
    }

    const handleRefresh = async () => {
        if (!refreshing) {
            setRefreshing(true)
            await listPost(idUser);
            await getUser(idUser);
            setRefreshing(false)
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
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            >
                <View style={styles.bodyContainer}>
                    <TouchableHighlight
                        underlayColor='blue'
                        onPress={() => alert('1')}>
                        <Image source={{ uri: user.imageCover }} style={{ width: '100%', height: height / 4 }} resizeMode='cover' />
                    </TouchableHighlight>
                    <View style={styles.avataContainer}>
                        <TouchableHighlight
                            underlayColor='gray'
                            onPress={() => alert('1')}>
                            <Avata styleImage={styles.avata} image={user.image} />
                        </TouchableHighlight>
                    </View>
                    <Title title={user.displayName} style={{ alignSelf: 'center', marginTop: 10, fontFamily: 'Roboto-Medium' }} />
                    {
                        user.bio ?
                            <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: width / 4 }}>
                                <Title title={user.bio} style={{ alignSelf: 'center', marginTop: 10, fontFamily: 'Roboto-Regular', fontSize: 16 }} />
                            </View>
                            : null
                    }

                    {
                        user.birthDay ?
                            <View style={styles.textInforContainer}>
                                <Image source={require('../../../assets/icon/cake.png')} />
                                <Title title={user.birthDay} style={styles.textInforUser} />
                            </View>
                            :
                            <View style={styles.textInforContainer}>
                                <Image source={require('../../../assets/icon/cake.png')} />
                                <Title title={`Your friend don't display`} style={styles.textInforUser} />
                            </View>
                    }

                    {
                        user.workAt ?
                            <View style={styles.textInforContainer}>
                                <Image source={require('../../../assets/icon/work.png')} />
                                <Title title={`Work At ${user.workAt}`} style={styles.textInforUser} />
                            </View> :
                            <View style={styles.textInforContainer}>
                                <Image source={require('../../../assets/icon/work.png')} />
                                <Title title={`Your friend don't display`} style={styles.textInforUser} />
                            </View>
                    }

                    {
                        user.studyAt ?
                            <View style={styles.textInforContainer}>
                                <Image source={require('../../../assets/icon/study.png')} />
                                <Title title={`Study At ${user.studyAt}`} style={styles.textInforUser} />
                            </View> :
                            <View style={styles.textInforContainer}>
                                <Image source={require('../../../assets/icon/study.png')} />
                                <Title title={`Your friend don't display`} style={styles.textInforUser} />
                            </View>
                    }

                    {
                        idUser == idUserRedux ?
                            <View style={{
                                marginVertical: 10, alignItems: 'center'
                            }}>
                                < TouchableHighlight
                                    style={{ overflow: 'hidden', backgroundColor: 'dodgerblue', borderRadius: 50 }}
                                    underlayColor='deepskyblue'
                                    onPress={() => navigation.navigate('ProfileEdit')}
                                >
                                    <Text style={{ color: 'white', fontFamily: 'Roboto-Medium', fontSize: 20, paddingHorizontal: 30, paddingVertical: 8 }}>Edit Profile</Text>
                                </TouchableHighlight>
                            </View>
                            : null
                    }


                    <View style={{ backgroundColor: 'white', marginVertical: 10 }}>
                        <Title title='Post' style={{ fontSize: 20, fontFamily: 'Roboto-Bold', marginVertical: 5, marginLeft: 20 }} />
                        <ItemInput />
                    </View>
                    {
                        posts.length == 0 ?
                            <Text style={{ alignSelf: 'center', marginTop: 20 }}>Don't have post to display</Text>
                            : posts.map((e, i) => (
                                <ItemPost key={i} item={e} />
                            ))
                    }
                </View>
            </ScrollView >
        </View >
    )
}

function mapStateToProps(state) {
    return {
        idUserRedux: state.user.infoUser._id
    }
}

export default connect(mapStateToProps)(ProfileDetail)


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
    textInforContainer: {
        flexDirection: 'row',
        padding: 10,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        alignItems: 'center'
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
        padding: 5
    },
    textInforUser: {
        marginLeft: 10,
        fontSize: 16
    }
})
