import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal } from 'react-native';

import Avata from './Avata'
import { TouchableHighlight } from 'react-native-gesture-handler';
import ModalPost from './ModalPost';


export default function ItemInput({ onPress }) {
    const [visiable, setVisiable] = useState(false)

    const closeModal = () => {
        setVisiable(false);
    }

    const openModal = () => {
        setVisiable(true);
    }
    return (
        <View style={styles.container}>
            <Avata image='' />
            <View style={styles.subContainer}>
                <TouchableHighlight
                    underlayColor='darkgray'
                    onPress={openModal}
                    style={styles.titleContainer}>
                    <Text style={styles.title}>What are you thinking?</Text>
                </TouchableHighlight>
            </View>
            <Modal visible={visiable} animationType='slide'>
                <ModalPost closeModal={closeModal} title='Create Post' buttonTitle='Post' />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row'
    },
    subContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    titleContainer: {
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 30,
        paddingVertical: 10,
        marginLeft: 10
    },
    title: {
        fontFamily: 'Roboto-Medium',
        marginLeft: 15
    }
})
