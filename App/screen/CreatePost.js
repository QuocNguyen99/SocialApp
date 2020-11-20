import React, { useState } from 'react'
import { StyleSheet, TextInput, View, TouchableHighlight, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import postApi from '../api/postApi';
import Icon from '../components/Icon'
import Title from '../components/Title';

export default function CreatePost({ closeModal }) {
    const [height, setHeight] = useState(50);
    const [content, setContent] = useState();
    const styleInput = {
        fontSize: 16,
        height: height,
        textAlignVertical: 'top',
        paddingTop: 15,
        paddingRight: 10
    }

    const updateSize = (e) => {
        setHeight(e)
    }

    const handlePost = async (content) => {
        if (content?.trim() === undefined) return alert(`Don't have any thing`)
        const postTemp = {
            content: content,
            author: '5fad248328154b0017758896'
        }
        const token = await AsyncStorage.getItem('Token');
        const result = await postApi.createPost(postTemp, token);
        return result !== 'Success' ? Alert.alert('Notification', `Post don't success`) : Alert.alert('Notification', 'Success');
    }

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
                <View style={styles.btnSubmit}>
                    <TouchableHighlight
                        style={styles.icon}
                        underlayColor='lightgray'
                        onPress={() => handlePost(content)}
                    >
                        <Title title='Post' />
                    </TouchableHighlight>
                </View>
            </View>
            <ScrollView>
                <View style={styles.containerContent}>
                    <TextInput
                        placeholder='What are you thinking?'
                        multiline={true}
                        onChangeText={(text) => setContent(text)}
                        onContentSizeChange={(e) => updateSize(e.nativeEvent.contentSize.height)}
                        style={styleInput} />
                </View>
                <View style={styles.footerContainer}>
                    <TouchableHighlight
                        underlayColor='silver'
                        onPress={() => alert('123')}
                        style={styles.inputImage}>
                        <Icon name='camera' size={30} />
                    </TouchableHighlight>
                </View>
            </ScrollView>
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
        marginTop: 15,
        marginHorizontal: 10
    },
    icon: {
        borderRadius: 50,
        padding: 10,
        marginHorizontal: 5
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
        flex: 1,
        alignItems: 'flex-end'
    }
})
