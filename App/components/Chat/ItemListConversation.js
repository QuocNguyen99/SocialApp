import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { BottomSheet, ListItem } from 'react-native-elements';

import Title from '../Title';
import Avata from '../Post/Avata';
import Icon from '../Icon';
import conversationApi from '../../api/conversationApi';
import authStorage from '../../auth/storage'

const { width, height } = Dimensions.get('screen');

export default function ItemListConversation({ item, onPress, idUser }) {
    const [visiableBottomSheet, setVisiableBottomSheet] = useState(false)
    const navigation = useNavigation();
    const profileConversationNotGroup = item.members.filter(e => !(e._id == idUser));
    const lastMessage = item.lastMessage;
    const timeCreate = moment(lastMessage.createAt).startOf('minutes').fromNow();
    const userLastMessage = item.lastMessage.sender._id !== idUser ? '' : 'You: '

    const list = [
        {
            title: 'Delete Conversation',
            icon: 'trash-o',
            titleStyle: { marginLeft: 5 },
            onPress: () => Alert.alert('Delete this conversation', 'Do you want delete ?', [
                { text: 'Ok', onPress: () => handleDeleteConversation(item._id) },
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

    const handleDeleteConversation = async (idConversation) => {
        try {
            const token = await authStorage.getToken();
            console.log(token);
            const { error } = await conversationApi.deleteConversation(idConversation, token);
            if (!error) return setVisiableBottomSheet(false)
        } catch (error) {
            console.log('DELETE CONVERSATION', error.message);
        }
    }
    return (
        <>
            <TouchableHighlight
                underlayColor='lightgray'
                onLongPress={() => setVisiableBottomSheet(true)}
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
            <BottomSheet
                isVisible={visiableBottomSheet}>
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
        </>

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
