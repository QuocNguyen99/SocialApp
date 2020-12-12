import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import ItemUser from '../../components/ItemUser';

import Icon from '../../components/Icon'
import { TouchableHighlight } from 'react-native-gesture-handler';
import Title from '../../components/Title'

const listItem = [
    { iconName: 'user', title: 'User Information' },
    { iconName: 'pencil', title: 'Edit Profile' },
    { iconName: 'sign-out', title: 'Log Out' }
]

export default function ProfileScreen({ navigation }) {
    const item = {
        displayName: 'Huỳnh Quốc Nguyên',
        image: 'https://res.cloudinary.com/dp2rat4ch/image/upload/v1606648718/xqwgsggu99l0uvod18te.jpg'
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Title title='Profile' style={styles.textHeader} />
            </View>
            <View style={styles.itemUserContainer}>
                <TouchableHighlight
                    style={{ paddingVertical: 5 }}
                    underlayColor='lightgray'
                    onPress={() => navigation.navigate('ProfileDetail')}
                >
                    <ItemUser item={item} isProfile={true} styleText={styles.styleText} />
                </TouchableHighlight>
            </View>

            {
                listItem.map((e, i) => (
                    <TouchableHighlight
                        key={i}
                        underlayColor='lightgray'
                        onPress={() => alert('1')}
                    >
                        <View style={styles.itemContainer}>
                            <Icon name={e.iconName} />
                            <Text style={{ marginLeft: 10, fontSize: 18 }}>{e.title}</Text>
                        </View>
                    </TouchableHighlight>
                ))
            }

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'whitesmoke'
    },
    headerContainer: {
        backgroundColor: 'dodgerblue',
        height: '7%',
        justifyContent: 'center'
    },
    itemUserContainer: {
        marginVertical: 10,
        backgroundColor: 'white',
        marginBottom: 20
    },
    styleText: {
        fontSize: 18
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 20,
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },
    textHeader: {
        marginLeft: 20,
        color: 'white',
        fontSize: 22,
        fontFamily: 'Roboto-Bold'
    }

})
