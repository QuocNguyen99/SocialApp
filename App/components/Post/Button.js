import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import Icon from '../Icon';

export default function Button({ onPress, title, styleContainer, styleTitle, styleTitleContainer, iconName, color }) {

    return (
        <TouchableHighlight
            style={[styles.container, styleContainer]}
            underlayColor='lightgray'
            onPress={onPress}
        >
            <View style={[styles.containerTitle, styleTitleContainer]}>
                {
                    !iconName ? null :
                        <Icon name={iconName} color={color} />
                }
                <Text style={[styles.title, styleTitle]}>{title}</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 10
    },
    containerTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        marginLeft: 5,
        color: 'black'
    }
})
