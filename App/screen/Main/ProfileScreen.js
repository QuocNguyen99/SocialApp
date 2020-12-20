import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, RefreshControl, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';

import ItemUser from '../../components/ItemUser';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Title from '../../components/Title';
import authStorage from '../../auth/storage'
import { removeUser } from '../../redux/action';
import userApi from '../../api/userApi';

const listItem = [
    {
        iconName: require('../../../assets/icon/pencil.png'),
        title: 'Edit Profile',
        onPress: async (navigation) => {
            navigation.navigate('ProfileEdit')
        }
    },
    {
        iconName: require('../../../assets/icon/darkmode.png'),
        title: 'Change Dark Theme',
        onPress: () => {
            alert('1')
        }
    },
    {
        iconName: require('../../../assets/icon/global.png'),
        title: 'Change Language',
        onPress: () => {
            alert('1')
        }
    },
    {
        iconName: require('../../../assets/icon/sign-out.png'),
        title: 'Log Out',
        onPress: async (navigation, removeInforUser) => {
            removeInforUser();
            await authStorage.removeToken();
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
    }
]

function ProfileScreen({ navigation, idUser, removeInforUser }) {
    const [user, setUser] = useState({});
    const [refreshing, setRefreshing] = useState(false)
    useEffect(() => {
        getUser(idUser);
    }, [])

    const getUser = async (idUser) => {
        try {
            const { error, data } = await userApi.getInfoUser(idUser);
            if (!error) {
                setUser(data);
            }
        } catch (error) {
            console.log('Get user', error.message);
        }
    }

    const handleRefresh = async () => {
        if (!refreshing) {
            setRefreshing(true)
            await getUser(idUser);
            setRefreshing(false)
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Title title='Profile' style={styles.textHeader} />
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            >
                <View style={styles.itemUserContainer} >
                    <TouchableHighlight
                        style={{ paddingVertical: 5 }}
                        underlayColor='lightgray'
                        onPress={() => navigation.navigate('ProfileDetail', { idUser: idUser })}
                    >
                        <ItemUser item={user} isProfile={true} styleText={styles.styleText} />
                    </TouchableHighlight>
                </View>

                {
                    listItem.map((e, i) => (
                        <TouchableHighlight
                            key={i}
                            underlayColor='lightgray'
                            onPress={() => {
                                if (e.title == 'Log Out')
                                    return e.onPress(navigation, removeInforUser);
                                else e.onPress(navigation);
                            }}
                        >
                            <View style={styles.itemContainer}>
                                <Image source={e.iconName} style={{ width: 20, height: 20 }} />
                                <Text style={{ marginLeft: 10, fontSize: 18 }}>{e.title}</Text>
                            </View>
                        </TouchableHighlight>
                    ))
                }
            </ScrollView>

        </View >
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'whitesmoke'
    },
    headerContainer: {
        backgroundColor: 'dodgerblue',
        height: '7%',
        justifyContent: 'center'
    },
    itemUserContainer: {
        marginVertical: 10,
        backgroundColor: 'white',
        marginBottom: 20
    },
    styleText: {
        fontSize: 18
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 20,
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },
    textHeader: {
        marginLeft: 20,
        color: 'white',
        fontSize: 22,
        fontFamily: 'Roboto-Bold'
    }

})
