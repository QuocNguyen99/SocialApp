import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Dimensions } from 'react-native';

import Title from '../components/Title';

const { width } = Dimensions.get('screen');

export default function AlbumScreen({ navigation }) {
    return (
        <View style={styles.container} >
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.icon}
                    activeOpacity={0.7}
                    onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/left-arrow-white.png')} />
                </TouchableOpacity>
                <Title title='Album' style={styles.title} />
            </View>

            <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/1200px-Android_robot.svg.png' }}
                    resizeMode='cover'
                    style={{ width: width / 4, height: width / 4, marginTop: 10, borderColor: 'white', borderWidth: 2 }}
                />
                <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/1200px-Android_robot.svg.png' }}
                    resizeMode='cover'
                    style={{ width: width / 4, height: width / 4, marginTop: 10, borderColor: 'white', borderWidth: 2 }}

                />
                <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/1200px-Android_robot.svg.png' }}
                    resizeMode='cover'
                    style={{ width: width / 4, height: width / 4, marginTop: 10, borderColor: 'white', borderWidth: 2 }}

                />
                <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/1200px-Android_robot.svg.png' }}
                    resizeMode='cover'
                    style={{ width: width / 4, height: width / 4, marginTop: 10, borderColor: 'white', borderWidth: 2 }}

                />
                <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/1200px-Android_robot.svg.png' }}
                    resizeMode='cover'
                    style={{ width: width / 4, height: width / 4, marginTop: 10, borderColor: 'white', borderWidth: 2 }}

                />
                <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/1200px-Android_robot.svg.png' }}
                    resizeMode='cover'
                    style={{ width: width / 4, height: width / 4, marginTop: 10, borderColor: 'white', borderWidth: 2 }}

                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
})
