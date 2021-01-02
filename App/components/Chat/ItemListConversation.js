import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Title from '../Title';
import Avata from '../Post/Avata';

export default function ItemListConversation({ item, onPress }) {
    const navigation = useNavigation();
    return (
        <TouchableHighlight
            underlayColor='lightgray'
            onPress={() => navigation.navigate('DetailChatScreen')}
        >
            <View style={styles.container}>
                <Avata styleImage={{ width: 50, height: 50, borderRadius: 25 }} />
                <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                    <Title title='Tên cuộc hội thoại' style={{ fontSize: 18 }} />
                    <View style={{ flexDirection: 'row' }}>
                        <Title title='Bạn: ' style={{ fontSize: 15 }} />
                        <Title title='Tin nhắn cuối' style={{ fontSize: 15 }} />
                        <Title title='11:30' style={{ fontSize: 15, marginLeft: 10 }} />
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
    }
})
