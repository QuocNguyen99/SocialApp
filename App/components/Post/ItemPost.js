import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import moment from 'moment';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Avata from './Avata'
import Button from './Button';
import ImagePost from './ImagePost';
import postApi from '../../api/postApi';
import socket from '../../socket/socket';
import SOCKET_URL from '../../socket/constant'


function ItemPost({ item, idUser }) {
    const [visiable, setVisiable] = useState(false)
    const [color, setColor] = useState();
    let { _id, author, createAt, content, image, likePost: likes } = item;
    const [countLike, setCountLike] = useState(likes.length);
    const { displayName, imageAuthor } = author;

    createAt = moment(createAt).startOf('hour').fromNow();

    useEffect(() => {
        changeColor(likes, idUser)
    }, [likes.length])

    useEffect(() => {
        getCountLikeFormSocket(setCountLike);
    }, [])

    // const getCountLike = (likes) => {
    //     setCountLike(likes.length)
    // }

    const getCountLikeFormSocket = (setCountLike) => {
        socket.on(SOCKET_URL.SERVER_SEND_COUNT_LIKE, (data) => {
            setCountLike(data);
        })
    }

    const sendCountLikeToSocket = (id) => {
        socket.emit(SOCKET_URL.CLIENT_SEND_COUNT_LIKE, id);
    }

    const openModal = () => {
        setVisiable(true)
    }

    let imageUrls = [];
    image.map(e => imageUrls.push({ url: e }))

    const likePost = async (id, idUser) => {
        try {
            const token = await AsyncStorage.getItem('Token');
            await postApi.likePost(id, idUser, token);
            sendCountLikeToSocket(id);
            // getCountLikeFormSocket(setCountLike);
            color == "dodgerblue" ? setColor('gray') : setColor('dodgerblue')
        } catch (error) {
            console.log('Like Post', error.message);
        }
    }

    const changeColor = (likes, idUser) => {
        const result = likes.filter(e => e == idUser);
        return result.length > 0 ? setColor('dodgerblue') : setColor('gray')
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
                <Text>{countLike}</Text>
                <Text>2</Text>
            </View>
            <View style={styles.footContainer}>
                <Button
                    title='Like'
                    iconName='thumbs-o-up'
                    styleTitle={{ color: color }}
                    onPress={() => likePost(_id, idUser)}
                    color={color} />
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
