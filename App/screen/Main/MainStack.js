import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const { height, width } = Dimensions.get("screen");

export default function MainStack() {

    return (
        <View style={styles.container}>
            <View styles={styles.containerSearch}>
                <TextInput placeholder='Search' style={styles.inputSearch} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    },
    containerSearch: {
        width: 200,
        height: 200,
        backgroundColor: 'white',
        zIndex: 555
    },
    inputSearch: {
        // alignSelf: 'center',
        // borderColor: 'gray',
        // borderWidth: 2,
        // paddingVertical: 5,
        // paddingLeft: 10,
        // width: width / 3,
    }
})
