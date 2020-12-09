import React from 'react'
import { StyleSheet, Image, View, TextInput, TouchableOpacity } from 'react-native';

import Icon from '../Icon';

export default function AppInput({ style, styleInput, entering, removeSearch, ...otherProps }) {
    return (
        <View style={[styles.containerInput, style]} >
            <TextInput style={[styles.input]} {...otherProps} />
            {
                entering > 0 ? (
                    <TouchableOpacity style={{ marginRight: 15, padding: 5 }} onPress={() => removeSearch()}>
                        <Image source={require(`../../../assets/icon/cancel.png`)} style={{ width: 10, height: 10 }} />
                    </TouchableOpacity>
                )
                    : null
            }

        </View>
    )
}

const styles = StyleSheet.create({
    containerInput: {
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        borderRadius: 30,
        alignItems: 'center'
    },
    input: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 20,
        overflow: 'hidden'
    }
})
