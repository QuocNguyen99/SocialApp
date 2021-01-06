import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import messageApi from '../api/message';
import Title from '../components/Title';
import { connect } from 'react-redux';

function DetailsChatScreen({ navigation, route, infoUser }) {
    const [messages, setMessages] = useState([]);
    const idConversation = route.params; rsation
    useEffect(() => {
        getListMessage()
    }, []);

    const getListMessage = async () => {
        try {
            const { error, data } = await messageApi.getListMessage(idConversation);
            if (error) return console.log('List mess Err', error);
            const newData = data.map(e => {
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
            setMessages([...newData])
        } catch (error) {
            console.log('List mess cATCH', error.message);
        }
    }

    const onSend = useCallback((idConversation, messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <View style={styles.container} >
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.icon}
                    activeOpacity={0.7}
                    onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/left-arrow-white.png')} />
                </TouchableOpacity>
                <Title title='Detail Chat' style={styles.title} />
            </View>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <GiftedChat
                    scrollToBottom
                    messages={messages}
                    onSend={messages => onSend(messages)}
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
        color: 'white', fontFamily: 'Roboto-Bold'
    },
})
