import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';

import Input from '../../components/Post/Input'

export default function SearchScreen() {
    const [search, setSearch] = useState('');
    return (
        <View style={styles.container}>
            <Input placeholder='Search' styleInput={{ overflow: 'hidden' }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'yellow',
        overflow: 'hidden'
    }
})
