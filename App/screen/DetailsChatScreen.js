import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';

import Title from '../components/Title'

export default function DetailsChatScreen({ navigation }) {
    return (
        <View style={styles.container} >
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.icon}
                    activeOpacity={0.7}
                    onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/left-arrow-white.png')} />
                </TouchableOpacity>
                <Title title='Detail Chat' style={styles.title} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bodyContainer: {
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
    icon: {
        padding: 5
    },
    title: {
        color: 'white', fontFamily: 'Roboto-Bold'
    },
})
