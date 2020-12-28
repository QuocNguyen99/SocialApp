import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableHighlight, View, Image, Dimensions, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';

import Title from '../Title'
import ItemCommentReply from './ItemCommentReply';
import Icon from '../../components/Icon';
import commentApi from '../../api/commentApi';
import authStorage from '../../auth/storage';

const { height } = Dimensions.get('screen');

function ModalReply({ item, closeModalReply, closeModal, idUser }) {
    const [text, setText] = useState('');
    const [heightInput, setHeightInput] = useState(60);
    const [listReply, setListReply] = useState([]);

    useEffect(() => {
        getListReply(item._id)
    }, [text.length])

    const getListReply = async (idCmt) => {
        try {
            const { error, data } = await commentApi.getListReply(idCmt);
            if (!error) {
                setListReply([...data]);
            }
        } catch (error) {
            console.log('Reply', error.message);
        }
    }

    const updateSize = (e) => {
        setHeightInput(e)
    }
    const styleInput = {
        height: heightInput
    }
    const handleCommentReply = async (idUser, id, idComment, text) => {
        try {
            console.log('1');
            const token = await authStorage.getToken();
            const comment = {
                content: text.trim(),
                author: idUser,
                idPost: id,
                idComment: idComment
            }
            console.log(comment);
            const { error } = await commentApi.createCommentReply(idComment, comment, token)
            if (!error) {
                setText('');
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
                    onPress={() => closeModalReply()}>
                    {/* <Icon name='arrow-left' color='black' size={20} /> */}
                    <Image source={require('../../../assets/icon/left-arrow.png')} />
                </TouchableHighlight>
                <Title title='Reply' />
            </View>
            <View style={styles.bodyContainer}>
                <ItemCommentReply item={item} isReply={true} closeModal={closeModal} />
                <View style={styles.subComment}>
                    <FlatList
                        data={listReply}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={({ item }) => (
                            <ItemCommentReply item={item} closeModal={closeModal} />
                        )}
                    />
                </View>
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
                            onPress={() => handleCommentReply(idUser, item.idPost, item._id, text)}
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

export default connect(mapStateToProps)(ModalReply)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bodyContainer: {
        flex: 1,
        margin: 10
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1
    },
    icon: {
        padding: 5,
        marginLeft: 5
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
    input: {
        flex: 1,
        paddingHorizontal: 5,
        fontSize: 18
    },
    subComment: {
        marginLeft: 40
    }
})
