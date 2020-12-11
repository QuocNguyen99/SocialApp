import React, { useState } from 'react'
import { StyleSheet, View, Dimensions, FlatList, ScrollView } from 'react-native';

import SearchBar from '../../components/SearchBar';
import Text from '../../components/Text';
import ItemUser from '../../components/ItemUser';
import ItemPost from '../../components/Post/ItemPost'
import postApi from '../../api/postApi';
import { TouchableHighlight } from 'react-native-gesture-handler';

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
            const { error, data } = await postApi.searchPost(search, 5);
            if (!error) {
                setPosts([...data.posts]);
                setUsers([...data.users]);
            }
        } catch (error) {
            console.log('Search', error.message);
        }
    }

    // const seeMorePost = async (search) => {
    //     try {
    //         const { error, data } = await postApi.searchPost(search, '');
    //         if (!error) {
    //             setPosts([...data.posts]);
    //             // setUsers([...data.users]);
    //             setButtonMore(false)
    //         }
    //     } catch (error) {
    //         console.log('Search', error.message);
    //     }
    // }

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
                                <>{
                                    users.map((e, i) => (
                                        <ItemUser key={i} item={e} />
                                    ))
                                }
                                    <View style={styles.buttonMoreContainer}>
                                        <TouchableHighlight
                                            style={styles.buttonMore}
                                            underlayColor='gray'
                                            onPress={() => alert('1')}
                                        >
                                            <Text >See all</Text>
                                        </TouchableHighlight>
                                    </View>
                                </>

                            ) : <Text style={{ alignSelf: 'center', marginBottom: 10 }}>Không tìm thấy</Text>

                        }
                    </View>
                    <View style={styles.postContainer}>
                        <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 10, fontFamily: 'Roboto-Bold' }}>Post</Text>
                        {
                            posts.length > 0 ? (
                                <>
                                    {
                                        posts.map((e, i) => (
                                            <ItemPost key={i} item={e} />
                                        ))
                                    }

                                    <View style={styles.buttonMoreContainer}>
                                        <TouchableHighlight
                                            style={styles.buttonMore}
                                            underlayColor='gray'
                                            onPress={() => alert('1')}
                                        >
                                            <Text >See all</Text>
                                        </TouchableHighlight>
                                    </View>

                                </>
                            ) : <Text style={{ alignSelf: 'center', marginBottom: 10 }}>Không tìm thấy</Text>
                        }
                    </View>
                </ScrollView>

            </View>
        </View >
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
    },
    buttonMoreContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonMore: {
        backgroundColor: 'lightgray',
        paddingHorizontal: width / 5,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 5
    }
})
