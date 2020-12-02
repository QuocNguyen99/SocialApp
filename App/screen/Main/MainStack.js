import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { connect } from 'react-redux'

import Icon from '../../components/Icon';
import Header from '../../components/Header';
import HomeScreen from '../Main/HomeScreen';
import authStorage from '../../auth/storage'
import { saveUser } from '../../redux/action';

const Tab = createMaterialTopTabNavigator();

function MainStack({ infoUser, handleSaveInfo }) {

    useEffect(() => {
        handleDispatchInfo()
    }, [])

    const handleDispatchInfo = async () => {
        if (Object.keys(infoUser).length === 0) {
            const user = await authStorage.getUser();
            handleSaveInfo(user);
        }
    }

    const Chat = () => (
        <View style={{ flex: 1 }}>
            <Text>Chat</Text>
        </View>
    )

    const Friend = () => (
        <View style={{ flex: 1 }}>
            <Text>Friend</Text>
        </View>
    )

    const Profile = () => (
        <View style={{ flex: 1 }}>
            <Text>Profile</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.containerBody}>
                <Tab.Navigator
                    tabBarOptions={{
                        activeTintColor: 'dodgerblue',
                        inactiveTintColor: 'gray',
                        indicatorStyle: {
                            backgroundColor: 'dodgerblue'
                        }
                    }}>
                    <Tab.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            tabBarLabel: ({ color }) => (
                                <Icon name='home' size={30} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Chat"
                        component={Chat}
                        options={{
                            tabBarLabel: ({ color }) => (
                                <Icon name='comment-o' size={30} color={color} style='Regular' />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Friend"
                        component={Friend}
                        options={{
                            tabBarLabel: ({ color }) => (
                                <Icon name='bell-o' size={30} color={color} />
                            ),
                        }} />
                    <Tab.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                            tabBarLabel: ({ color }) => (
                                <Icon name='user-o' size={30} color={color} />
                            ),
                        }} />
                </Tab.Navigator>
            </View>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        infoUser: state.user.infoUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleSaveInfo: (info) => dispatch(saveUser(info))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainStack)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    containerBody: {
        flex: 9,
        backgroundColor: 'whitesmoke'
    }
})
