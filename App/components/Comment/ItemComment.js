import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, Modal, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Avata from '../Post/Avata'
import moment from 'moment';
import ModalReply from './ModalReply'
import commentApi from '../../api/commentApi';

const { width } = Dimensions.get('screen');
export default function ItemComment({ item, closeModal }) {
    const [visiableReply, setVisiableReply] = useState(false);
    const [count, setCount] = useState();
    const [latestComments, setLatestComments] = useState();
    let { content, author, createAt } = item;
    createAt = moment(createAt).startOf('minute').fromNow();
    const navigation = useNavigation();

    useEffect(() => {
        getLengthReply(item._id)
    }, [])

    const getLengthReply = async (id) => {
        try {
            const { error, data } = await commentApi.getReplyLength(id);
            if (!error) {
                setCount(data.count);
                setLatestComments(data.latestComments)
            }
        } catch (error) {
            console.log('LengthReply', error.message);
        }
    }

    const closeModalReply = () => {
        setVisiableReply(false)
    }

    const goToDetailsScreen = (id) => {
        closeModal();
        navigation.navigate('ProfileDetail', { idUser: id })
    }
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => goToDetailsScreen(item.author._id)}
                >
                    <Avata image={author.image} />
                </TouchableOpacity>
                <View style={styles.bodyContainer}>
                    <TouchableOpacity
                        onPress={() => goToDetailsScreen(item.author._id)}
                    >
                        <Text style={styles.displayName}>{author.displayName}</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16 }}>{content}</Text>
                </View>
            </View>
            <View style={styles.timeContainer}>
                <Text>{createAt}</Text>
                <Text style={{ marginLeft: 20 }}>Like</Text>
                <TouchableWithoutFeedback onPress={() => setVisiableReply(true)}>
                    <Text style={{ marginLeft: 20 }}>Reply</Text>
                </TouchableWithoutFeedback>
            </View>
            {count > 0 ? (
                <View style={styles.replyContainer}>
                    <TouchableHighlight
                        underlayColor='lightgray'
                        onPress={() => setVisiableReply(true)}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Avata image={latestComments?.author?.image} styleImage={styles.imageReply} />
                            <Text style={styles.displayName}>{latestComments?.author.displayName}</Text>
                            <Text style={{ fontSize: 16, maxWidth: '60%' }} numberOfLines={1} ellipsizeMode='tail'>{latestComments?.content}</Text>
                        </View>
                    </TouchableHighlight>
                    {
                        count - 1 > 0 ? (
                            <View style={{ flexDirection: 'column', marginVertical: 2 }}>
                                <TouchableHighlight
                                    underlayColor='lightgray'
                                    onPress={() => setVisiableReply(true)}
                                >
                                    <Text style={{ fontFamily: 'Roboto-Medium' }}>See more {count - 1} reply</Text>
                                </TouchableHighlight>
                            </View>
                        ) : null
                    }
                </View>
            ) : null}
            <Modal visible={visiableReply} animationType='fade'>
                <ModalReply closeModalReply={closeModalReply} closeModal={closeModal} item={item} isReply={true} />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 2
    },
    bodyContainer: {
        marginLeft: 10,
        padding: 10,
        paddingLeft: 12,
        borderRadius: width / 20,
        backgroundColor: '#F1F2F6'
    },
    timeContainer: {
        flexDirection: 'row',
        marginBottom: 5,
        marginLeft: 60
    },
    replyContainer: {
        marginBottom: 10,
        marginLeft: 60
    },
    imageReply: {
        height: 20,
        width: 20,
        marginLeft: 5
    },
    displayName: {
        fontFamily: 'Roboto-Medium', fontSize: 16, marginRight: 5
    }
})
