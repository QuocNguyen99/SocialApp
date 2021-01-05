import React, { } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import Title from '../Title';
import Avata from '../Post/Avata';

const { width, height } = Dimensions.get('screen');

export default function ItemListConversation({ item, onPress, idUser }) {
    const navigation = useNavigation();
    const profileConversationNotGroup = item.members.filter(e => !(e._id == idUser));
    const lastMessage = item.lastMessage;
    const timeCreate = moment(lastMessage.createAt).startOf('minutes').fromNow();
    const userLastMessage = item.lastMessage.sender._id !== idUser ? 'You: ' : ''
    return (
        <TouchableHighlight
            underlayColor='lightgray'
            onPress={() => navigation.navigate('DetailChatScreen', { idConversation: item._id, imageConversation: profileConversationNotGroup[0].image, nameConversation: profileConversationNotGroup[0].displayName })}
        >
            <View style={styles.container}>
                <Avata image={profileConversationNotGroup[0].image} styleImage={styles.avata} />
                <View style={styles.bodyContainer}>
                    <Title title={profileConversationNotGroup[0].displayName} style={{ fontSize: 18 }} />
                    <View style={styles.contentContainer}>
                        <Title title={userLastMessage} style={{ fontSize: 15 }} />
                        <Title title={lastMessage.content} style={{ fontSize: 15, width: '40%' }} numberOfLines={1} />
                        <Title title={timeCreate} style={{ fontSize: 15, marginLeft: 10 }} />
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 10
    },
    avata: {
        width: 50, height: 50, borderRadius: 25
    },
    bodyContainer: {
        flexDirection: 'column',
        marginLeft: 15
    },
    contentContainer: {
        flexDirection: 'row', flex: 1
    }
})
