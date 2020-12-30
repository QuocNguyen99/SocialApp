import React from 'react'
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';

import Title from '../components/Title'

export default function ChatScreen({ navigation }) {
    return (
        <View style={styles.container} >
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.icon}
                    activeOpacity={0.7}
                    onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/left-arrow-white.png')} />
                </TouchableOpacity>
                <Title title='Chat' style={styles.title} />
                <TouchableOpacity
                    style={styles.iconRight}
                >
                    <Image source={require('../../assets/icon/search.png')} style={styles.search} />
                </TouchableOpacity>
            </View>
            <View>

            </View>
        </View>
    )
}

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
    icon: {
        padding: 5,
    },
    title: {
        color: 'white', fontFamily: 'Roboto-Bold'
    },
    iconRight: {
        flex: 1,
        alignItems: 'flex-end',
        width: 20,
        height: 30,
        justifyContent: 'center'
    },
    search: {
        width: 25,
        height: 25
    }
})
