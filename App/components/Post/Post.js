import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Modal, StyleSheet } from 'react-native';

import ItemPost from './ItemPost';
import postApi from '../../api/postApi'

export default function Post() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getPosts();
    }, [page])

    const getPosts = async () => {
        try {
            const { data } = await postApi.getListPost(page);
            setPosts([...data]);

        } catch (error) {
            console.log('Posts', error.message);
        }
    }
    return (
        <FlatList
            scrollEnabled={false}
            style={styles.container}
            data={posts}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
                <ItemPost item={item} />
            )}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    }
})
