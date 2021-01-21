import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import { connect } from 'react-redux';
import messageApi from '../api/messageApi';
import Title from '../components/Title';
import Avata from '../components/Post/Avata'
import socket from '../socket/socket';
import SOCKET_URL from '../socket/constant';

function DetailsChatScreen({ navigation, route, infoUser }) {
    let [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [loadMore, setLoadMore] = useState(true);
    const { idConversation, imageConversation, nameConversation } = route.params
    useEffect(() => {
        let unmount = true;
        getListMessage(unmount, page);
        receiveMessageSocket(unmount, infoUser);
        return () => {
            unmount = false;
        }
    }, [page]);

    // useEffect(() => {
    //     let unmount = true;
    //     receiveMessageSocket(unmount, infoUser);
    //     return () => {
    //         unmount = false;
    //     }
    // }, []);

    useEffect(() => {
        connectRoomSocket(idConversation)
    }, []);


    const sendMessageSocket = (idConversation, message) => {
        socket.emit(SOCKET_URL.CLIENT_SEND_MESSAGE, { idConversation, message })
    }

    const connectRoomSocket = (idConversation) => {
        socket.emit(SOCKET_URL.CLIENT_SEND_ROOM, idConversation)
    }

    const receiveMessageSocket = (unmount, infoUser) => {
        socket.on(SOCKET_URL.SERVER_SEND_MESSAGE, async (message) => {
            const mess = message.messageSendClient;
            if (mess.sender._id !== infoUser) {
                const structGiftChatMessage = {
                    _id: mess._id,
                    text: mess.content,
                    createdAt: mess.createdAt,
                    user: {
                        _id: mess.sender._id,
                        name: mess.sender.displayName,
                        avatar: mess.sender.image,
                    },
                }
            }
            await getListMessage(true, page);

        })
    }

    const getListMessage = async (unmount, page) => {
        try {
            const { error, data } = await messageApi.getListMessage(idConversation, page);
            if (error) return console.log('List mess Err', error);
            let newData = data.map(e => {
                return {
                    _id: e._id,
                    text: e.content,
                    createdAt: e.createdAt,
                    user: {
                        _id: e.sender._id,
                        name: e.sender.displayName,
                        avatar: e.sender.image,
                    },
                }
            })
            unmount && setMessages([...messages, ...newData])

        } catch (error) {
            console.log('List mess cATCH', error.message);
        }
    }

    const onSend = useCallback((idConversation, messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        sendMessageSocket(idConversation, messages)
    }, [])

    const onLoadEarlier = () => {
        if (messages.length >= 20) {
            return setPage(Number(page) + 1);
        }
        return;
    }

    return (
        <View style={styles.container} >
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.icon}
                    activeOpacity={0.7}
                    onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/left-arrow-white.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.profileChat}
                    onPress={() => navigation.navigate('ProfileConversation', { imageConversation, nameConversation })}>
                    <Avata image={imageConversation} styleImage={{ width: 30, height: 30 }} />
                    <Title title={nameConversation} style={styles.title} />
                </TouchableOpacity>

            </View>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <GiftedChat
                    scrollToBottom
                    infiniteScroll
                    loadEarlier={true}
                    onLoadEarlier={() => onLoadEarlier()}
                    onPressAvatar={(user) => navigation.navigate('ProfileDetail', { idUser: user._id })}
                    messages={messages}
                    onSend={messages => onSend(idConversation, messages)}
                    user={{
                        _id: infoUser,
                    }}
                />
            </View>

        </View>
    )
}

function mapStateToProps(state) {
    return {
        infoUser: state.user.infoUser._id
    }
}
export default connect(mapStateToProps)(DetailsChatScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bodyContainer: {
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        backgroundColor: '#1E90FF'
    },
    icon: {
        padding: 5
    },
    title: {
        marginLeft: 10,
        fontSize: 14,
        color: 'white',
        fontFamily: 'Roboto-Bold'
    },
    profileChat: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
