import React, { useEffect, useRef, useState } from 'react'
import { FlatList, View, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';

import ItemPost from './ItemPost';
import postApi from '../../api/postApi'

export default function Post() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        getPosts();
    }, [])

    useEffect(() => {
        getPosts(setIsLoading);
    }, [page])

    const getPosts = async (setIsLoading) => {
        try {
            setIsLoading ? setIsLoading(true) : null
            const { data } = await postApi.getListPost(page);
            if (page === 1) {
                setPosts([...data]);
            } else {
                setPosts([...posts, ...data]);
            }

            setIsLoading ? setIsLoading(false) : null
        } catch (error) {
            console.log('Posts', error.message);
        }
    }

    const handleLoadMore = () => {
        setPage(page + 1);
    }

    const renderFooter = () => (
        isLoading ? (
            <View style={styles.footer}>
                <ActivityIndicator size='small' color='#1E90FF' />
            </View>
        )
            : null
    )

    const onRefresh = () => {
        if (refresh == false) {
            return setPage(1);
        }
    };

    return (
        <FlatList

            style={styles.container}
            data={posts}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
                <ItemPost item={item} />
            )}
            refreshControl={
                <RefreshControl refreshing={refresh} onRefresh={() => onRefresh()} colors={['#1E90FF']} />
            }
            onEndReached={() => handleLoadMore()}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    footer: {
        marginVertical: 5,
        alignItems: 'center'
    }
})
