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
                <Title title='Create Post' />
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <TouchableHighlight
                        style={styles.icon}
                        underlayColor='lightgray'
                        onPress={() => alert('Post')}
                    >
                        <Title title='Post' />
                    </TouchableHighlight>
                </View>
            </View>
            <View style={styles.containerContent}>
                <TextInput placeholder='What are you thinking?' multiline={true} style={styles.input} />
            </View>
            <View style={styles.footerContainer}>
                <TouchableHighlight
                    underlayColor='silver'
                    onPress={() => alert('123')}
                    style={styles.inputImage}>
                    <Icon name='camera' size={30} />
                </TouchableHighlight>
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
        flex: 1
    },
    icon: {
        borderRadius: 50,
        padding: 10,
        marginHorizontal: 5
    },
    input: {
        fontSize: 16,
        height: height / 1.4,
        textAlignVertical: 'top',
        paddingTop: 15,
        paddingRight: 10
    },
    inputImage: {
        backgroundColor: 'lightgray',
        height: 80,
        width: 80,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnSubmit: {
        justifyContent: 'flex-end'
    }
})
