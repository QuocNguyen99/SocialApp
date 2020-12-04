import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, View, TouchableHighlight, ScrollView, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

import postApi from '../../api/postApi';
import Icon from '../Icon'
import Title from '../../components/Title';
import ListImages from '../../components/ListImages';
import authStorage from '../../auth/storage'

function CreatePost({ closeBottomSheet, closeModal, infoUser, title, buttonTitle, idPost }) {
    const [height, setHeight] = useState(50);
    const [content, setContent] = useState('');
    const [images, setImages] = useState([])

    useEffect(() => {
        getPostById(idPost)
    }, [])

    const styleInput = {
        fontSize: 16,
        height: height,
        textAlignVertical: 'top',
        paddingTop: 15,
        paddingRight: 10
    }

    const options = {
        title: 'Choose Image',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        saveToPhotos: true,
        quality: 0.5
    };

    // nếu k phải Edit thì return null phải thì set giá trị
    const getPostById = async (idPost) => {
        try {
            if (title !== 'Edit Post') return;
            const { error, data } = await postApi.getPostById(idPost);
            setImages([...data.image]);
            setContent(data.content);
        } catch (error) {
            console.log('Post By Id', error.messagea);
        }

    }


    const openLibary = () => {
        return ImagePicker.launchImageLibrary(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = `data:image/png;base64,${response.data}`
                setImages([...images, source])
            }
        });
    }
    const updateSize = (e) => {
        setHeight(e)
    }

    const onPressCancelBottomSheet = () => {
        closeModal();
        if (closeBottomSheet !== undefined) return closeBottomSheet()
    }

    const handlePost = async (idPost, content, images) => {
        try {
            if (content?.trim() === undefined && (images?.length === 0 || images === undefined)) return Alert.alert('Notification', `Please enter something`);
            const postTemp = {
                content: content,
                image: images,
                author: infoUser
            }
            const token = await authStorage.getToken()
            let result;
            if (title !== 'Edit Post') {
                result = await postApi.createPost(postTemp, token);
            } else {
                result = await postApi.updatePost(idPost, postTemp, token)
            }
            const { error, data } = result;
            return error ? Alert.alert(title, `Post don't success`) :
                Alert.alert(title, 'Success', [{ text: 'Ok', onPress: () => onPressCancelBottomSheet() }]);
        } catch (error) {
            console.log('Error', error.message);
        }

    }

    const removeImage = (i) => {
        Alert.alert('Delete', 'Do you want remove?', [
            {
                text: 'Yes', onPress: () => {
                    const newImages = images.filter((e, index) => index !== i);
                    setImages(newImages)
                }
            },
            { text: 'No' }
        ])
    }

    return (
        <View style={styles.container} >
            <View style={styles.headerContainer}>
                <TouchableHighlight
                    style={styles.icon}
                    underlayColor='gray'
                    onPress={closeModal}>
                    <Image source={require('../../../assets/icon/left-arrow.png')} />
                </TouchableHighlight>
                <Title title={title} />
                <View style={styles.btnSubmit}>
                    <TouchableHighlight
                        style={styles.icon}
                        underlayColor='lightgray'
                        onPress={() => handlePost(idPost, content, images)}
                    >
                        <Title title={buttonTitle} style={styles.textSubmit} />
                    </TouchableHighlight>
                </View>
            </View>
            <ScrollView>
                <View style={styles.containerContent}>
                    <TextInput
                        placeholder='What are you thinking?'
                        multiline={true}
                        value={content}
                        onChangeText={(text) => setContent(text)}
                        onContentSizeChange={(e) => updateSize(e.nativeEvent.contentSize.height)}
                        style={styleInput} />
                </View>
                <View style={styles.footerContainer}>
                    <ScrollView horizontal={true}>
                        <ListImages images={images} removeImage={removeImage} />
                        <TouchableHighlight
                            underlayColor='silver'
                            onPress={() => openLibary()}
                            style={styles.inputImage}>
                            <Icon name='camera' size={30} />
                        </TouchableHighlight>
                    </ScrollView>
                </View>
            </ScrollView>
        </ View >
    )
}

function mapStateToProps(state) {
    return {
        infoUser: state.user.infoUser._id
    }
}
export default connect(mapStateToProps)(CreatePost)

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
        borderBottomWidth: 1
    },
    footerContainer: {
        flex: 1,
        marginTop: 15,
        marginHorizontal: 10,
        flexDirection: 'row'
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
    image: {
        height: 80,
        width: 80,
        borderRadius: 10,
        marginRight: 5
    },
    btnSubmit: {
        flex: 1,
        alignItems: 'flex-end'
    },
    textSubmit: {
        fontFamily: 'Roboto-Light',
        color: 'blue'
    }
})
