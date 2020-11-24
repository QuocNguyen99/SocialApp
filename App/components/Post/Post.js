import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Modal, StyleSheet } from 'react-native';

import ItemPost from './ItemPost';
import postApi from '../../api/postApi'

const array = [
    {
        _id: 1,
        image: [
            'https://scontent.fsgn5-7.fna.fbcdn.net/v/t1.0-9/125380686_2961727500725312_8435336220472208532_n.jpg?_nc_cat=1&ccb=2&_nc_sid=8bfeb9&_nc_ohc=Llm0nhfjrZcAX8Wo-k8&_nc_ht=scontent.fsgn5-7.fna&oh=1169287275e68bd60bdc4dca8b532fb6&oe=5FD5CCDF',
            'https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.0-9/125075217_3970498836313818_2988606688003002567_n.png?_nc_cat=1&ccb=2&_nc_sid=730e14&_nc_ohc=9T_e6TANXWwAX8WtrUB&_nc_ht=scontent.fsgn5-1.fna&oh=f6c1c13a131b180b2dbd9caf062b59b0&oe=5FD3EE68',
            'https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.0-9/125416917_110717277518925_1856872737157854797_n.jpg?_nc_cat=105&ccb=2&_nc_sid=dbeb18&_nc_ohc=nsedcmg3OsIAX-OppMq&_nc_ht=scontent.fsgn5-2.fna&oh=82c110503d9c201e11ab2abfab6d79b4&oe=5FD4C06E',
            'https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-9/125235805_2560821600886685_1673082202902713231_n.png?_nc_cat=109&ccb=2&_nc_sid=730e14&_nc_ohc=MdfXCAtFSSUAX9ZHD-D&_nc_ht=scontent.fsgn5-6.fna&oh=72bc782a302cdcb3aeebb950a2a8bb4c&oe=5FD578C0',
            'https://i.stack.imgur.com/xfmhQ.jpg',
            'https://i.stack.imgur.com/xfmhQ.jpg'
        ],
        content: 'Today is Sunday',
        author: {
            imageAuthor: 'https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.0-9/125261248_1699844323525973_2655632312308726898_o.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_ohc=Uis-kxx37X4AX_kbNLI&_nc_ht=scontent.fsgn5-1.fna&oh=c00a6fe8d30159a5eed66407b63f6cfd&oe=5FD52BA3',
            displayName: 'Huỳnh Quốc Nguyên'
        },
        createAt: "2020-11-11T18:05:25.376Z"
    },
    {
        _id: 2,
        content: 'Today is Friday',
        image: [
            'https://i.stack.imgur.com/xfmhQ.jpg',
            'https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.0-9/123795660_1751104158383908_6507300819074355342_n.jpg?_nc_cat=107&ccb=2&_nc_sid=09cbfe&_nc_ohc=XTfPg7JHfmQAX_WQdln&_nc_ht=scontent.fsgn5-1.fna&oh=31aa17bcbf494ed8513ec1f3e105c67a&oe=5FD61C89'],
        author: {
            imageAuthor: 'https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.0-9/125261248_1699844323525973_2655632312308726898_o.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_ohc=Uis-kxx37X4AX_kbNLI&_nc_ht=scontent.fsgn5-1.fna&oh=c00a6fe8d30159a5eed66407b63f6cfd&oe=5FD52BA3',
            displayName: 'Vịt Fi'
        },
        createAt: "2020-11-11T18:05:25.376Z"
    },
    {
        _id: 3,
        content: 'Hight Nguyên',
        image: [],
        author: {
            imageAuthor: '',
            displayName: 'Cao Ngọc Nguyên'
        },
        createAt: "2020-11-11T18:05:25.376Z"
    },
    {
        _id: 4,
        image: [],
        content: 'Thề đéo yêu Vy nữa',
        author: {
            imageAuthor: 'https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.0-9/121198768_1489536287902377_6119391392053762210_n.jpg?_nc_cat=110&ccb=2&_nc_sid=09cbfe&_nc_ohc=796j_6Izmn4AX_8xlrT&_nc_ht=scontent.fsgn5-3.fna&oh=d1b0c266cc32c994f51783fad2bc94b4&oe=5FD60BF2',
            displayName: 'Gia Bảo'
        },
        createAt: "2020-11-11T18:05:25.376Z"
    },
    {
        _id: 5,
        image: ['https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.0-9/123795660_1751104158383908_6507300819074355342_n.jpg?_nc_cat=107&ccb=2&_nc_sid=09cbfe&_nc_ohc=XTfPg7JHfmQAX_WQdln&_nc_ht=scontent.fsgn5-1.fna&oh=31aa17bcbf494ed8513ec1f3e105c67a&oe=5FD61C89'],
        author: {
            imageAuthor: 'https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.0-9/125261248_1699844323525973_2655632312308726898_o.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_ohc=Uis-kxx37X4AX_kbNLI&_nc_ht=scontent.fsgn5-1.fna&oh=c00a6fe8d30159a5eed66407b63f6cfd&oe=5FD52BA3',
            displayName: 'Vịt Fi'
        },
        createAt: "2020-11-11T18:05:25.376Z"
    },
    {
        _id: 6,
        content: 'Hight Nguyên',
        image: ['https://scontent-xsp1-1.xx.fbcdn.net/v/t1.0-9/37611867_1055594584601539_6265316524093865984_n.jpg?_nc_cat=109&ccb=2&_nc_sid=174925&_nc_ohc=I9MkerWZPhQAX_v7o85&_nc_ht=scontent-xsp1-1.xx&oh=d8267378131d85479d9f66f08437c10a&oe=5FD6FB26'],
        author: {
            imageAuthor: '',
            displayName: 'Cao Ngọc Nguyên'
        },
        createAt: "2020-11-11T18:05:25.376Z"
    },
    {
        _id: 7,
        image: [],
        content: 'Today is Sunday',
        author: {
            imageAuthor: 'https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.0-9/125261248_1699844323525973_2655632312308726898_o.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_ohc=Uis-kxx37X4AX_kbNLI&_nc_ht=scontent.fsgn5-1.fna&oh=c00a6fe8d30159a5eed66407b63f6cfd&oe=5FD52BA3',
            displayName: 'Huỳnh Quốc Nguyên'
        },
        createAt: "2020-11-11T18:05:25.376Z"
    },
    {
        _id: 8,
        content: 'Today is Friday',
        image: ['https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.0-9/123795660_1751104158383908_6507300819074355342_n.jpg?_nc_cat=107&ccb=2&_nc_sid=09cbfe&_nc_ohc=XTfPg7JHfmQAX_WQdln&_nc_ht=scontent.fsgn5-1.fna&oh=31aa17bcbf494ed8513ec1f3e105c67a&oe=5FD61C89'],
        author: {
            imageAuthor: 'https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.0-9/125261248_1699844323525973_2655632312308726898_o.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_ohc=Uis-kxx37X4AX_kbNLI&_nc_ht=scontent.fsgn5-1.fna&oh=c00a6fe8d30159a5eed66407b63f6cfd&oe=5FD52BA3',
            displayName: 'Vịt Fi'
        },
        createAt: "2020-11-11T18:05:25.376Z"
    },
    {
        _id: 9,
        content: 'Hight Nguyên',
        image: [],
        author: {
            imageAuthor: '',
            displayName: 'Cao Ngọc Nguyên'
        },
        createAt: "2020-11-11T18:05:25.376Z"
    },
]

export default function Post() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getPosts();
    }, [page])

    const getPosts = async () => {
        try {
            const { data } = await postApi.getListPost(page);
            setPosts([...posts, ...data])
        } catch (error) {
            console.log('Posts', error.message);
        }

    }
    console.log('Post', posts.length);
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
