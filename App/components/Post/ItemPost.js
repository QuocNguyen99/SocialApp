import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import moment from 'moment';

import Avata from './Avata'
import Button from './Button';
import ImagePost from './ImagePost';
import Icon from '../Icon';


export default function ItemPost({ item }) {
    const [visiable, setVisiable] = useState(false)
    let { author, createAt, content, image } = item;
    const { displayName, imageAuthor } = author;
    createAt = moment(createAt).startOf('hour').fromNow();
    const openModal = () => {
        setVisiable(true)
    }

    let imageUrls = [];
    image.map(e => imageUrls.push({ url: e }))

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Avata image={imageAuthor} />
                <View style={styles.subContainer}>
                    <Text style={styles.name}>{displayName}</Text>
                    <Text style={styles.time}>{createAt}</Text>
                </View>
            </View>
            {
                !content ? null : (
                    <View style={styles.contentContainer}>
                        <Text style={styles.content}>{content}</Text>
                    </View>
                )
            }
            {
                image.length == 0 ? null :
                    <TouchableHighlight underlayColor='gray' onPress={openModal}>
                        <ImagePost images={image} />
                    </TouchableHighlight>
            }
            <View style={styles.likeCmtContainer}>
                <Text>12</Text>
                <Text>2</Text>
            </View>
            <View style={styles.footContainer}>
                <Button
                    title='Like'
                    iconName='thumbs-o-up'
                    onPress={() => alert('Like')} />
                <Button
                    title='Comment'
                    iconName='commenting-o'
                    onPress={() => alert('Cooment')} />
            </View>

            <Modal visible={visiable} transparent={true}>
                <ImageViewer imageUrls={imageUrls} enableSwipeDown={true} enableImageZoom={true} onCancel={() => setVisiable(false)} />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        backgroundColor: 'white',
        paddingTop: 10
    },
    contentContainer: {
        margin: 10,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    footContainer: {
        borderTopColor: 'lightgray',
        borderTopWidth: 1,
        flexDirection: 'row',
    },
    likeCmtContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 5
    },
    subContainer: {
        marginLeft: 10,
        marginBottom: 10
    },
    header: {
        paddingHorizontal: 20,
        flexDirection: 'row'
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    time: {
        color: 'gray'
    },
    content: {
        fontFamily: 'Roboto-Regular',
        color: 'black',
        fontSize: 18
    }
})
