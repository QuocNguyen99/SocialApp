import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import Icon from './Icon'

const { width } = Dimensions.get("screen");

export default function Header() {
    return (
        <View style={styles.containerSearch}>
            <Text style={styles.title}>DOLPHIN</Text>
            <View style={styles.search}>
                <TouchableOpacity
                    onPress={() => alert('Chat')}
                >
                    <Image source={require('../../assets/icon/messenger.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerSearch: {
        height: 65,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: -5
    },
    search: {

    },
    a: {
        backgroundColor: 'lightgray',
        padding: 8,
        borderRadius: 25
    },
    title: {
        fontSize: 30,
        color: 'dodgerblue',
        fontWeight: 'bold'
    }
})
