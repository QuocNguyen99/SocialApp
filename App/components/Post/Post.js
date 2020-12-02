import React, { useEffect, useRef, useState } from 'react'
import { FlatList, View, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';

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
            console.log(page);
            const { data } = await postApi.getListPost(page);
            if (page === 1) {
                setPosts([...data]);
            } else {
                setPosts([...posts, ...data]);
                console.log(posts.map(e => e.content));
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
            setPage(1);
            const { data } = await postApi.getListPost(page);
            setPosts([...data]);
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
        paddingTop: 65,
        marginBottom: 10
    },
    footer: {
        marginVertical: 5,
        alignItems: 'center'
    }
})
