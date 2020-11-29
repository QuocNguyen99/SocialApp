import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Modal, Alert } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import moment from 'moment';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomSheet, ListItem } from 'react-native-elements';

import Avata from './Avata'
import Button from './Button';
import ImagePost from './ImagePost';
import postApi from '../../api/postApi';
import socket from '../../socket/socket';
import SOCKET_URL from '../../socket/constant'
import Icon from '../Icon';
import ModalPost from '../Post/ModalPost'

function ItemPost({ item, idUser }) {
    const [visiable, setVisiable] = useState(false)
    const [visiableEdit, setVisiableEdit] = useState(false)
    const [visiableBottomSheet, setVisiableBottomSheet] = useState(false)
    const [color, setColor] = useState();
    let { _id, author, createAt, content, image, likePost: likes } = item;
    const [countLike, setCountLike] = useState(likes.length);
    const { displayName, imageAuthor } = author;
    createAt = moment(createAt).startOf('second').fromNow();

    useEffect(() => {
        changeColor(likes, idUser)
    }, [likes.length])

    useEffect(() => {
        getCountLikeFormSocket(setCountLike, _id);
    }, [])

    // kết nối với socket nhận về data là length likes
    const getCountLikeFormSocket = (setCountLike, id) => {
        socket.on(SOCKET_URL.SERVER_SEND_COUNT_LIKE, (data) => {
            if (data.id == id) {
                setCountLike(data.count);
            }
        })
    }

    //gửi len socket lượt like hiện tại
    const sendCountLikeToSocket = (id) => {
        socket.emit(SOCKET_URL.CLIENT_SEND_COUNT_LIKE, id);
    }

    //mở react native viewer
    const openModal = () => {
        setVisiable(true)
    }

    const openModalEdit = () => {
        setVisiableEdit(true);
    }

    const closeModalEdit = () => {
        setVisiableEdit(false);
    }

    const openVisiableBottomSheet = () => {
        setVisiableBottomSheet(true)
    }

    //option react native image viewer để show ảnh 
    let imageUrls = [];
    image.map(e => imageUrls.push({ url: e }))

    // method like post 
    const likePost = async (id, idUser) => {
        try {
            const token = await AsyncStorage.getItem('Token');
            await postApi.likePost(id, idUser, token);
            sendCountLikeToSocket(id);
            color == "dodgerblue" ? setColor('gray') : setColor('dodgerblue')
        } catch (error) {
            console.log('Like Post', error.message);
        }
    }

    //đổi màu buton like khi đã like
    const changeColor = (likes, idUser) => {
        const result = likes.filter(e => e == idUser);
        return result.length > 0 ? setColor('dodgerblue') : setColor('gray')
    }

    //xóa bài đăng
    const deletePost = async (idUser, id) => {
        try {
            const token = await AsyncStorage.getItem('Token');
            const { error } = await postApi.deletePost(idUser, id, author, token);
            if (!error) setVisiableBottomSheet(false)
        } catch (error) {
            console.log('Delete Post', error.message);
        }
    }

    const list = [
        {
            title: 'Edit Post',
            icon: 'pencil-square-o',
            titleStyle: { marginLeft: 5 },
            onPress: () => openModalEdit()
        },
        {
            title: 'Delete Post',
            icon: 'trash-o',
            titleStyle: { marginLeft: 5 },
            onPress: () => Alert.alert('Delete Post', 'Do you want delete ?', [
                { text: 'Ok', onPress: () => deletePost(idUser, _id, author) },
                { text: 'Cancel' }
            ])
        },

        {
            title: 'Cancel',
            icon: 'ban',
            colorIcon: 'white',
            containerStyle: { backgroundColor: 'red' },
            titleStyle: { color: 'white', marginLeft: 5 },
            onPress: () => setVisiableBottomSheet(false),
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Avata image={imageAuthor} />
                <View style={styles.subContainer}>
                    <Text style={styles.name}>{displayName}</Text>
                    <Text style={styles.time}>{createAt}</Text>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'flex-end'
                }}>
                    {
                        author._id == idUser ?
                            <TouchableHighlight
                                underlayColor='gray'
                                style={{ padding: 8 }}
                                onPress={openVisiableBottomSheet}>
                                <Icon name='ellipsis-v' color='black' size={20} />
                            </TouchableHighlight>
                            : null
                    }
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
                    <TouchableHighlight
                        underlayColor='gray'
                        onPress={openModal}>
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
            <BottomSheet isVisible={visiableBottomSheet}>
                {
                    list.map((e, i) => (
                        <ListItem key={i} containerStyle={e.containerStyle} onPress={e.onPress}>
                            <ListItem.Content >
                                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name={e.icon} size={15} color={e.colorIcon} />
                                    <ListItem.Title style={e.titleStyle}>{e.title}</ListItem.Title>
                                </View>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </BottomSheet>
            <Modal visible={visiableEdit} animationType='slide'>
                <ModalPost closeModal={closeModalEdit} closeBottomSheet={() => setVisiableBottomSheet(false)} title='Edit Post' buttonTitle='Edit' idPost={_id} />
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
