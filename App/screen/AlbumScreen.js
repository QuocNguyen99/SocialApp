import { setIn } from 'formik';
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Dimensions, Modal } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';

import userApi from '../api/userApi';
import Title from '../components/Title';

const { width } = Dimensions.get('screen');

export default function AlbumScreen({ navigation, route }) {
    const [images, setImages] = useState([]);
    const [visiable, setVisiable] = useState(false)
    const [index, setIndex] = useState(0)
    const [page, setPage] = useState(1);
    useEffect(() => {
        getImageUser();
    }, [])

    let imageUrls = [];
    images.map(e => imageUrls.push({ url: e }))

    const getImageUser = async () => {
        try {
            const idUser = route.params.idUser;
            const { error, data } = await userApi.getImagesUser(idUser);
            if (error) return console.log('GET LIST IMAGE');
            setImages([...images, ...data])
        } catch (error) {
            console.log('GET IMAGES', error);
        }
    }
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

            <FlatList
                data={images}
                numColumns={4}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => {
                            setIndex(index)
                            setVisiable(true)
                        }}
                    >
                        <Image
                            source={{ uri: item }}
                            resizeMode='cover'
                            style={{ width: width / 4, height: width / 4, marginTop: 2, borderColor: 'white', borderWidth: 2 }}
                        />
                    </TouchableOpacity>
                )}
            />

            <Modal visible={visiable} transparent={true}>
                <ImageViewer imageUrls={imageUrls} enableSwipeDown={true} onCancel={() => setVisiable(false)} index={index} />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
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
