import React, { useEffect, useRef, useState } from 'react'
import { FlatList, View, StyleSheet } from 'react-native';

import ItemPost from './ItemPost';
import postApi from '../../api/postApi'

export default function Post({ handelOnScroll }) {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        getPosts();
    }, [page])

    const getPosts = async () => {
        try {
            if (refresh == true) return;
            const { data } = await postApi.getListPost(page);
            if (page === 1) {
                setPosts([...data]);
            } else {
                setPosts([...posts, ...data]);
            }
        } catch (error) {
            console.log('Posts', error.message);
        }
    }

    const handleLoadMore = () => {
        setPage(page + 1);
    }

    const handleOnRefresh = async () => {
        try {
            setRefresh(true)
            setPage(1);
            const { data } = await postApi.getListPost(1);
            setPosts([...data]);
            setRefresh(false)
        } catch (error) {
            console.log('Posts', error.message);
        }
    }

    return (
        <FlatList
            style={styles.container}
            data={posts}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
                <ItemPost item={item} />
            )}
            onEndReached={() => handleLoadMore()}
            onEndReachedThreshold={0.2}
            refreshing={refresh}
            onRefresh={() => handleOnRefresh()}
            showsVerticalScrollIndicator={false}
            onScroll={handelOnScroll()}
        />
    )
}

const styles = StyleSheet.create({
    container: {
    },
    footer: {
        marginVertical: 5,
        alignItems: 'center'
    }
})
