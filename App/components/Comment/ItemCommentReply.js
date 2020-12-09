import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, Modal } from 'react-native';

import Avata from '../Post/Avata'
import moment from 'moment';

const { width } = Dimensions.get('screen');
export default function ItemComment({ item }) {
    let { content, author, createAt } = item;
    createAt = moment(createAt).startOf('minute').fromNow();

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Avata image={author.image} />
                <View style={styles.bodyContainer}>
                    <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16 }}>{author.displayName}</Text>
                    <Text style={{ fontSize: 16 }}>{content}</Text>
                </View>
            </View>
            <View style={styles.timeContainer}>
                <Text>{createAt}</Text>
                <Text style={{ marginLeft: 20 }}>Like</Text>
            </View>
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
        marginBottom: 10,
        marginLeft: 70
    }
})
