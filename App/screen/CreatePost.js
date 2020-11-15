import React from 'react'
import { StyleSheet, ScrollView, TextInput, View, TouchableHighlight, KeyboardAvoidingView } from 'react-native';

import Icon from '../components/Icon'
import Title from '../components/Title';

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
                <ScrollView>
                    <KeyboardAvoidingView behavior='padding'>
                        <TextInput placeholder='What are you thinking?' multiline={true} style={styles.input} />
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
            <View style={styles.footerContainer}>
                <View style={styles.subFooter}>
                    <View style={{ backgroundColor: 'blue', height: 50, width: 50 }}></View>
                    <View style={{ backgroundColor: 'red', height: 50, width: 50 }}></View>
                </View>
            </View>
        </ View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerContent: {
        flex: 1,
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
        justifyContent: 'flex-end'
    },
    icon: {
        borderRadius: 30,
        padding: 10
    },
    input: {
        fontSize: 16
    },
    subFooter: {
        flex: 0.5,
        position: 'absolute',
        backgroundColor: 'yellow',
        height: 200, width: '100%',
        flexDirection: 'row'
    }
})
