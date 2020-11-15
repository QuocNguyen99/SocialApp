import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default function ImagePost({ images }) {

    function render_1(array) {
        return (
            <View style={{ borderWidth: 1, borderColor: 'white', height: 350 }}>
                <Image
                    resizeMode='cover'
                    style={{ height: '100%' }}
                    source={{ uri: array[0] }}
                />
            </View>
        )
    }
    function render_2(array) {
        return (
            <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: 'white', height: 350 }}>
                {
                    array.map((e, i) => (
                        <Image
                            key={i}
                            resizeMode='cover'
                            style={{ height: '100%', width: '50%', flex: 0.5, borderWidth: 1, borderColor: 'white' }}
                            source={{ uri: e }}
                        />))
                }
            </View>
        )
    }
    function render_3(array) {
        return (
            <>
                <Image
                    resizeMode='cover'
                    style={{ height: 200 }}
                    source={{ uri: array[0] }}
                />
                <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: 'white', height: 150 }}>
                    {
                        array.slice(1, 3).map((e, i) => (
                            <Image
                                key={i}
                                resizeMode='cover'
                                style={{ height: '100%', width: '50%', flex: 0.5, borderWidth: 1, borderColor: 'white' }}
                                source={{ uri: e }}
                            />))
                    }
                </View>
            </>
        )
    }

    function render_4(array) {
        return (
            <>
                <Image

                    resizeMode='cover'
                    style={{ height: 200 }}
                    source={{ uri: array[0] }}
                />
                <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: 'white', height: 150 }}>
                    {
                        array.slice(1, 4).map((e, i) => (
                            <Image
                                key={i}
                                resizeMode='cover'
                                style={{ height: '100%', width: '50%', flex: 0.5, borderWidth: 1, borderColor: 'white' }}
                                source={{ uri: e }}
                            />))
                    }
                </View>
            </>
        )
    }

    function render_5(array) {
        let array2;
        if (array.length > 5) {
            array2 = array.slice(5)
        }
        return (
            <>
                <View style={{ flexDirection: 'row' }} >
                    < Image
                        key={'0'}
                        resizeMode='cover'
                        style={{ minHeight: 200, flex: 0.5, borderWidth: 1, borderColor: 'white' }}
                        source={{ uri: array[0] }}
                    />
                    < Image
                        key={'1'}
                        resizeMode='cover'
                        style={{ minHeight: 200, flex: 0.5, borderWidth: 1, borderColor: 'white' }}
                        source={{ uri: array[1] }}
                    />
                </View>
                <View style={{ flexDirection: 'row', height: 150, width: '100%' }}>
                    {
                        array.slice(2, 4).map((e, i) => (
                            <Image
                                key={i}
                                resizeMode='cover'
                                style={{ height: '100%', width: '50%', flex: 0.5, borderWidth: 1, borderColor: 'white' }}
                                source={{ uri: e }}
                            />
                        ))
                    }
                    <View style={{ height: 150, flex: 0.5 }}>
                        <Image
                            key={4}
                            resizeMode='cover'
                            style={{ height: '100%', borderWidth: 1, borderColor: 'white' }}
                            source={{ uri: array[4] }}
                        />
                        {
                            !(array.length > 5) ? null : (
                                <View style={{ height: 150, justifyContent: 'center', width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', position: 'absolute' }}>
                                    <Text style={{ alignSelf: 'center', color: 'white', fontSize: 35 }}>+{array2.length}</Text>
                                </View>
                            )
                        }
                    </View>
                </View>
            </>
        )
    }

    return (
        <View>
            {images && images.length == 1 ? render_1(images) : null}
            {images && images.length == 2 ? render_2(images) : null}
            {images && images.length == 3 ? render_3(images) : null}
            {images && images.length == 4 ? render_4(images) : null}
            {images && images.length >= 5 ? render_5(images) : null}
        </View>
    )
}

const styles = StyleSheet.create({})
