import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableHighlight, View, Image, TextInput, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native';
import { connect } from 'react-redux';

import ItemComment from './ItemComment'
import Title from '../../components/Title';
import Icon from '../../components/Icon'
import commentApi from '../../api/commentApi';
import authStorage from '../../auth/storage';
import SOCKET_URL from '../../socket/constant';
import socket from '../../socket/socket';

const { height } = Dimensions.get('screen');

function ModalComment({ closeModal, idUser, id }) {
    const [text, setText] = useState('');
    const [heightInput, setHeightInput] = useState(60);
    const [listComment, setListComment] = useState([]);

    useEffect(() => {
        getListComment(id);
    }, [])

    const updateSize = (e) => {
        setHeightInput(e)
    }
    const styleInput = {
        height: heightInput
    }

    const getListComment = async (id) => {
        const { data } = await commentApi.getListComments(id);
        setListComment([...data])
    }

    const sendCountCommentToSocket = (id) => {
        socket.emit(SOCKET_URL.CLIENT_SEND_COUNT_COMMENT, id);
    }

    const handleComment = async (idUser, id, text) => {
        try {
            const token = await authStorage.getToken();
            const comment = {
                content: text,
                author: idUser,
                idPost: id
            }
            const { error } = await commentApi.createComments(id, comment, token)
            if (!error) {
                setText('');
                getListComment(id);
                sendCountCommentToSocket(id)
            }
        } catch (error) {
            console.log('Comment', error.message);
        }

    }

    return (
        <View style={styles.container} >
            <View style={styles.headerContainer}>
                <TouchableHighlight
                    style={styles.icon}
                    underlayColor='gray'
                    onPress={() => closeModal()}>
                    {/* <Icon name='arrow-left' color='black' size={20} /> */}
                    <Image source={require('../../../assets/icon/left-arrow.png')} />
                </TouchableHighlight>
                <Title title='Comment' />
            </View>
            <View style={styles.bodyContainer}>
                <FlatList
                    data={listComment}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <ItemComment item={item} />
                    )}
                />

            </View>
            <View style={[styles.footerContainer, styleInput]} keyboardShouldPersistTaps={'always'}>
                <TextInput
                    placeholder='Write a comment...'
                    autoFocus={true}
                    multiline={true}
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    onContentSizeChange={(e) => updateSize(e.nativeEvent.contentSize.height)}
                    value={text}
                    onChangeText={(value) => setText(value)}
                />
                {
                    text.length > 0 ? (
                        <TouchableOpacity
                            onPress={() => handleComment(idUser, id, text)}
                            style={{ paddingHorizontal: 5 }}
                        >
                            <Icon name='send' color='dodgerblue' />
                        </TouchableOpacity>
                    ) : null
                }
            </View>
        </View>
    )
}
function mapStateToProps(state) {
    return {
        idUser: state.user.infoUser._id
    }
}

export default connect(mapStateToProps)(ModalComment)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1
    },
    bodyContainer: {
        flex: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: 'lightgray',
        borderTopWidth: 1,
        backgroundColor: 'whitesmoke',
        height: height / 15,
        paddingHorizontal: 10
    },
    icon: {
        padding: 5,
        marginLeft: 5
    },
    input: {
        flex: 1,
        paddingHorizontal: 5,
        fontSize: 18
    }
})
