import axiosClient from "./axiosClient";
import ENDPOINT from "./constants";

const postApi = {
    createPost: (post, token) => {
        try {
            const url = ENDPOINT.CREATE_POST;

            return axiosClient.post(
                url,
                {
                    content: post.content,
                    image: post.image,
                    author: post.author,
                    comment: post.comment,
                    likePost: post.likePost
                },
                {
                    headers: {
                        'token': token
                    }
                }
            )
        } catch (error) {
            console.log('err', error.message);
        }

    },
    getListPost: (page) => {
        try {
            const url = ENDPOINT.GET_LIST_POST;
            return axiosClient.get(
                url,
                {
                    params: {
                        page: page
                    }
                }
            )
        } catch (error) {
            console.log('err', error.message);
        }
    },
    likePost: (id, idUser, token) => {
        try {
            const url = ENDPOINT.LIKE_POST;
            return axiosClient.put(
                url,
                {
                    idUser: idUser,

                },
                {
                    headers: {
                        'token': token
                    },
                    params: {
                        'id': id
                    }
                },

            )
        } catch (error) {
            console.log('Error', error.message);
        }
    }
}

export default postApi;