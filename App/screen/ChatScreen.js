import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Image, View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import Title from '../components/Title';
import ItemListConversation from '../components/Chat/ItemListConversation'
import conversationApi from '../api/conversationApi';

function ChatScreen({ navigation, idUser }) {

    const [listConversation, setListConversation] = useState([]);

    useEffect(() => {
        getDataListConversation(idUser);
    }, []);

    const getDataListConversation = async (idUser) => {
        try {
            const { error, data, message } = await conversationApi.getListConversation(idUser);
            if (error) return alert("List Conver" + message);
            setListConversation([...data]);
        } catch (error) {
            console.log('List Conver', error.message);
        }
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
                <Title title='Chat' style={styles.title} />
                <TouchableOpacity
                    style={styles.iconRight}
                >
                    <Image source={require('../../assets/icon/search.png')} style={styles.search} />
                </TouchableOpacity>
            </View>
            <View style={styles.bodyContainer}>
                <FlatList
                    data={listConversation}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <ItemListConversation item={item} idUser={idUser} />
                    )}
                />
            </View>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        idUser: state.user.infoUser._id
    }
}

export default connect(mapStateToProps)(ChatScreen)

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
    iconRight: {
        flex: 1,
        alignItems: 'flex-end',
        width: 20,
        height: 30,
        justifyContent: 'center'
    },
    search: {
        width: 25,
        height: 25,
        marginRight: 5
    }
})
