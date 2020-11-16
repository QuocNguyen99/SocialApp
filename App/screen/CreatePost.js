import React from 'react'
import { StyleSheet, ScrollView, TextInput, View, TouchableHighlight, Dimensions } from 'react-native';

import Icon from '../components/Icon'
import Title from '../components/Title';

const { height } = Dimensions.get('screen');

export default function CreatePost({ closeModal }) {
    return (
        <View style={styles.container} >
            <View style={styles.headerContainer}>
                <TouchableHighlight
                    style={styles.icon}
                    underlayColor='gray'
                    onPress={closeModal}>
                    <Icon name='arrow-left' color='black' size={20} />
                </TouchableHighlight>
                <Title title='Tạo bài viết' />
            </View>
            <View style={styles.containerContent}>
                <TextInput placeholder='What are you thinking?' multiline={true} style={styles.input} />
            </View>
            <View style={styles.footerContainer}>
                <View style={{ backgroundColor: 'red', height: 50, width: 50 }}></View>
            </View>
        </ View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerContent: {
        paddingHorizontal: 10
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderBottomColor: 'lightgray',
        borderWidth: 1
    },
    footerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'yellow'
    },
    icon: {
        borderRadius: 30,
        padding: 10
    },
    input: {
        fontSize: 16,
        height: height / 1.4,
        textAlignVertical: 'top',
        paddingTop: 15,
        paddingRight: 10
    }
})
