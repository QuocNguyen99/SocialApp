import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';


import Icon from '../components/Icon';
import Avatar from './Post/Avata';

export default function ItemUser({ item, styleText, isProfile = false }) {
    const { displayName, image } = item
    return (
        <View style={styles.container}>
            <Avatar image={image} />
            <View style={styles.subContainer}>
                <Text style={[styles.displayName, styleText]}>{displayName}</Text>
                {
                    isProfile ? null :
                        <View style={styles.rightContainer}>
                            <Image source={require('../../assets/icon/offline.png')} style={{ width: 12, height: 12 }} />
                            <Text style={{ marginLeft: 5 }}>offline</Text>
                        </View>
                }
            </View>
            {
                isProfile ?
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                        <Icon name='chevron-right' color='dodgerblue' />
                    </View> :
                    null

            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        borderBottomColor: 'black',
    },
    subContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
    displayName: {
        marginLeft: 15,
        fontFamily: 'Roboto-Bold'
    }
})
