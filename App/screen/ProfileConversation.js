import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, TouchableHighlight, View, Image, Text } from 'react-native';

import Title from '../components/Title';
import Avata from '../components/Post/Avata'

export default function ProfileConversation({ navigation, route }) {
    const [profileCon, setProfileCon] = useState({});
    const { imageConversation, nameConversation } = route.params;

    // useEffect(()=>{

    // },[]);

    // const getProfile=async(idConversation)=>{

    // }
    return (
        <View style={styles.container} >
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.icon}
                    activeOpacity={0.7}
                    onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/left-arrow-white.png')} />
                </TouchableOpacity>
                <Title title='Profile Conversation' style={styles.title} />
            </View>

            <View style={styles.bodyContainer}>
                <View style={styles.avataContainer}>
                    <Avata
                        image={imageConversation}
                        styleImage={styles.avata} />
                    <Title title={nameConversation} style={styles.title2} />
                </View>

                <View style={styles.optionContainer}>
                    <TouchableHighlight
                        onPress={() => alert('1')}
                        underlayColor='whitesmoke'
                        style={styles.option}>
                        <View style={styles.textOption}>
                            <Text style={styles.text}>Thành viên</Text>
                            <View style={styles.text2}>
                                <Text style={styles.text3}>2</Text>
                            </View>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight
                        onPress={() => alert('1')}
                        underlayColor='whitesmoke'
                        style={styles.option}>
                        <View style={styles.textOption}>
                            <Text style={styles.text}>Hình Ảnh</Text>
                            <View style={styles.text2}>
                                <Text style={styles.text3}>2</Text>
                            </View>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight
                        onPress={() => alert('1')}
                        underlayColor='whitesmoke'
                        style={styles.option}>
                        <View style={styles.textOption}>
                            <Text style={styles.text}>File</Text>
                            <View style={styles.text2}>
                                <Text style={styles.text3}>2</Text>
                            </View>
                        </View>
                    </TouchableHighlight>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
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
    optionContainer: {
        marginTop: 20,
        justifyContent: 'center'
    },
    avata: {
        width: 120,
        height: 120,
        borderRadius: 75,
        marginTop: 40
    },
    avataContainer: {
        alignItems: 'center'
    },
    option: {
        padding: 15
    },
    icon: {
        padding: 5
    },
    title: {
        marginLeft: 10,
        color: 'white',
        fontFamily: 'Roboto-Bold'
    },
    title2: {
        marginTop: 20,
        marginLeft: 10,
        color: 'black',
        fontFamily: 'Roboto-Bold'
    },
    textOption: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 20
    },
    text2: {
        flex: 1,
        alignItems: 'flex-end',
        paddingVertical: 2
    },
    text3: {
        backgroundColor: 'gray',
        color: 'white',
        borderRadius: 100,
        paddingVertical: 5,
        paddingHorizontal: 10,
        textAlign: 'center',
        fontSize: 15
    }
})
