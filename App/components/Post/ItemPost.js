import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import moment from 'moment';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Avata from './Avata'
import Button from './Button';
import ImagePost from './ImagePost';
import postApi from '../../api/postApi'

function ItemPost({ item, idUser }) {
    const [visiable, setVisiable] = useState(false)
    let { _id, author, createAt, content, image } = item;
    const { displayName, imageAuthor } = author;
    createAt = moment(createAt).startOf('hour').fromNow();
    const openModal = () => {
        setVisiable(true)
    }

    let imageUrls = [];
    image.map(e => imageUrls.push({ url: e }))

    const likePost = async (id, idUser) => {
        try {
            const token = await AsyncStorage.getItem('Token');
            console.log('Token', token);
            console.log('2', _id);
            const { error } = await postApi.likePost(id, idUser, token);
            console.log('3', error);
            if (!error) console.log('Success');
        } catch (error) {
            console.log('Like Post', error.message);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Avata image={imageAuthor} />
                <View style={styles.subContainer}>
                    <Text style={styles.name}>{displayName}</Text>
                    <Text style={styles.time}>{createAt}</Text>
                </View>
            </View>
            {
                !content ? null : (
                    <View style={styles.contentContainer}>
                        <Text style={styles.content}>{content}</Text>
                    </View>
                )
            }
            {
                image.length == 0 ? null :
                    <TouchableHighlight underlayColor='gray' onPress={openModal}>
                        <ImagePost images={image} />
                    </TouchableHighlight>
            }
            <View style={styles.likeCmtContainer}>
                <Text>12</Text>
                <Text>2</Text>
            </View>
            <View style={styles.footContainer}>
                <Button
                    title='Like'
                    iconName='thumbs-o-up'
                    onPress={() => likePost(_id, idUser)} />
                <Button
                    title='Comment'
                    iconName='commenting-o'
                    onPress={() => alert('Cooment')} />
            </View>

            <Modal visible={visiable} transparent={true}>
                <ImageViewer imageUrls={imageUrls} enableSwipeDown={true} onCancel={() => setVisiable(false)} />
            </Modal>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        idUser: state.user.infoUser.id
    }
}

export default connect(mapStateToProps)(ItemPost)

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        backgroundColor: 'white',
        paddingTop: 10
    },
    contentContainer: {
        margin: 10,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    footContainer: {
        borderTopColor: 'lightgray',
        borderTopWidth: 1,
        flexDirection: 'row',
    },
    likeCmtContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 5
    },
    subContainer: {
        marginLeft: 10,
        marginBottom: 10
    },
    header: {
        paddingHorizontal: 20,
        flexDirection: 'row'
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    time: {
        color: 'gray'
    },
    content: {
        fontFamily: 'Roboto-Regular',
        color: 'black',
        fontSize: 18
    }
})
