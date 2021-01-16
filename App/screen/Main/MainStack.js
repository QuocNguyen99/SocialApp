import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';


import Icon from '../../components/Icon';
import HomeScreen from '../Main/HomeScreen';
import SearchScreen from '../Main/SearchScreen';
import ProfileScreen from './ProfileScreen';
import ProfileDetail from '../../components/Profile/ProfileDetail';
import ProfileEdit from '../../components/Profile/ProfileEdit'
import authStorage from '../../auth/storage'
import { saveUser } from '../../redux/action';
import ChangePassword from '../../components/Profile/ChangePasswordScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

const Profile = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
        <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
        <Stack.Screen name='ProfileDetail' component={ProfileDetail} />
        <Stack.Screen name='ProfileEdit' component={ProfileEdit} />
        <Stack.Screen name='ProfileEditPassword' component={ChangePassword} />

    </Stack.Navigator>
)

function MainStack({ infoUser, handleSaveInfo }) {
    const [saveUser, setSaveUser] = useState(false);
    useEffect(() => {
        let mount = true
        handleDispatchInfo(mount)
    }, [])

    const handleDispatchInfo = async (mount) => {
        if (Object.keys(infoUser).length === 0 && mount == true) {
            const user = await authStorage.getUser();
            handleSaveInfo(user);
        }
    }

    const Friend = () => (
        <View style={{ flex: 1 }}>
            <Text>Friend</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <View style={styles.containerBody}>
                <Tab.Navigator
                    tabBarOptions={{
                        activeTintColor: 'dodgerblue',
                        inactiveTintColor: 'black',
                        showLabel: false,
                        indicatorStyle: {
                            backgroundColor: 'dodgerblue'
                        },
                    }}>
                    <Tab.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <Icon name='address-card-o' size={30} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Search"
                        component={SearchScreen}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <Icon name='search' size={30} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Friend"
                        component={Friend}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <Icon name='bell-o' size={30} color={color} />
                            ),
                        }} />
                    <Tab.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <Icon name='user-circle-o' size={30} color={color} />
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
