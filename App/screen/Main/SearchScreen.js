import React, { useState } from 'react'
import { StyleSheet, View, Dimensions, FlatList, ScrollView } from 'react-native';

import SearchBar from '../../components/SearchBar';
import Text from '../../components/Text';
import ItemUser from '../../components/ItemUser';
import ItemPost from '../../components/Post/ItemPost'
import postApi from '../../api/postApi';

const { width } = Dimensions.get('screen')

export default function SearchScreen() {
    const [search, setSearch] = useState('');
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    const removeSearchText = () => {
        setSearch('');
        setUsers([]);
        setPosts([])
    }
    const onChangeInput = (value) => {
        setSearch(value)
    }

    const submitSearchBar = async (search) => {
        try {
            const { error, data } = await postApi.search(search);
            if (!error) {
                setPosts([...data.posts]);
                setUsers([...data.users]);
            }
        } catch (error) {
            console.log('Search', error.message);
        }
    }

    return (
        <View style={styles.container}>
            <SearchBar
                removeSearchText={removeSearchText}
                value={search}
                onChangeText={onChangeInput}
                buttonSubmit={submitSearchBar} />
            <View style={styles.bodyContainer}>
                <ScrollView>
                    <View style={styles.peopleContainer}>
                        <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 10, fontFamily: 'Roboto-Bold' }}>People</Text>
                        {
                            users.length > 0 ? (
                                <FlatList
                                    data={users}
                                    keyExtractor={(item) => item._id.toString()}
                                    renderItem={({ item }) => (
                                        <ItemUser item={item} />
                                    )}
                                    ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'whitesmoke' }}></View>}
                                />
                            ) : <Text style={{ alignSelf: 'center', marginBottom: 10 }}>Không tìm thấy</Text>
                        }

                    </View>
                    <View style={styles.postContainer}>
                        <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 10, fontFamily: 'Roboto-Bold' }}>Post</Text>
                        {
                            posts.length > 0 ? (
                                <FlatList
                                    data={posts}
                                    keyExtractor={(item) => item._id.toString()}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <ItemPost item={item} />
                                    )}
                                    ItemSeparatorComponent={() => <View style={{ height: 10, backgroundColor: 'whitesmoke' }}></View>}
                                />
                            ) : <Text style={{ alignSelf: 'center', marginBottom: 10 }}>Không tìm thấy</Text>
                        }

                    </View>
                </ScrollView>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    bodyContainer: {
        marginHorizontal: 10,
        marginTop: 10
    },
    peopleContainer: {
        backgroundColor: 'white',
        borderRadius: width / 20
    },
    postContainer: {
        marginTop: 10,
        marginBottom: 120,
        backgroundColor: 'white',
        borderRadius: width / 20,
    }
})
