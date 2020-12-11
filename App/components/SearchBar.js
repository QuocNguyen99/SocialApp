import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Input from '../components/Post/Input';

export default function SearchBar({ removeSearchText, value, onChangeText, buttonSubmit }) {
    return (
        <View style={styles.container}>
            <Input
                placeholder='Search...'
                styleInput={{ overflow: 'hidden' }}
                entering={value.length}
                removeSearch={removeSearchText}
                style={{ flex: 1 }}
                value={value}
                onChangeText={(value) => onChangeText(value)}
            />
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => buttonSubmit(value)}
            >
                <Text style={{ marginHorizontal: 5, color: 'white', fontFamily: 'Roboto-Medium' }}>Search</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'dodgerblue',
        overflow: 'hidden',
        padding: 10
    }
})
