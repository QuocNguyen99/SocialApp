import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get("screen");

export default function Header({ }) {
    const navigation = useNavigation();
    return (
        <View style={styles.containerSearch}>
            <Text style={styles.title}>DOLPHIN</Text>
            <View style={styles.search}>
                <TouchableOpacity
                    style={styles.iconRight}
                    onPress={() => navigation.navigate('ChatScreen')}
                >
                    <Image source={require('../../assets/icon/message-blue.png')} style={styles.message} />
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
    message: {
        width: 30,
        height: 30
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
    },
    iconRight: {
        flex: 1,
        alignItems: 'flex-end',
        width: 20,
        height: 30,
        justifyContent: 'center'
    }
})
