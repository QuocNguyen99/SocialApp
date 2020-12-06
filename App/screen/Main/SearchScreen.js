import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Input from '../../components/Post/Input'

export default function SearchScreen() {
    const [search, setSearch] = useState('');

    const removeSearchText = () => {
        setSearch('');
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder='Search...'
                styleInput={{ overflow: 'hidden' }}
                entering={search.length}
                removeSearch={removeSearchText}
                style={{ flex: 1 }}
                value={search}
                onChangeText={(value) => setSearch(value)}
            />
            <TouchableOpacity
                onPress={() => alert('123')}
            >
                <Text style={{ marginHorizontal: 5, color: 'blue' }}>Search</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        overflow: 'hidden',
        padding: 10
    }
})
