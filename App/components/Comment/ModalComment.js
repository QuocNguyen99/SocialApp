import React from 'react'
import { StyleSheet, TouchableHighlight, View, Image } from 'react-native';

import ItemComment from './ItemComment'
import Title from '../../components/Title';

export default function ModalComment({ closeModal }) {
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
                <ItemComment />
            </View>
        </View>
    )
}

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
        paddingHorizontal: 10
    },
    icon: {
        padding: 10,
        marginLeft: 5
    },
})
