import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Icon from './Icon'

const { width } = Dimensions.get("screen");

export default function Header() {
    return (
        <View style={styles.containerSearch}>
            <Text style={styles.title}>DOLPHIN</Text>
            <View style={styles.search}>
                <Icon name='search' size={25} color='black' style={styles.a} onPress={() => alert('Search')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerSearch: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 15,
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
