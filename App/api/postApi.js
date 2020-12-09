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
    getPostById: (id) => {
        try {
            const url = ENDPOINT.GET_POST_BY_ID;
            return axiosClient.get(
                url,
                {
                    params: {
                        id: id
                    }
                }
            )
        } catch (error) {
            console.log('err', error.message);
        }
    },
    updatePost: (idPost, post, token) => {
        try {
            const url = ENDPOINT.UPDATE_POST;
            return axiosClient.put(
                url,
                {
                    content: post.content,
                    image: post.image
                },
                {
                    headers: {
                        'token': token
                    },
                    params: {
                        id: idPost
                    }
                }
            )
        } catch (error) {
            console.log('err', error.message);
        }
    },
    deletePost: (idUser, id, author, token) => {
        try {
            const url = ENDPOINT.DELETE_POST;
            return axiosClient.delete(
                url,
                {
                    headers: {
                        'token': token
                    },
                    params: {
                        id: id
                    }
                },
                {
                    idUser: idUser,
                    author: author
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
    },
    search: (content) => {
        try {
            const url = ENDPOINT.SEARCH_POST_USER;
            return axiosClient.get(
                url,
                {
                    params: {
                        'content': content
                    }
                },
            )
        } catch (error) {
            console.log('Error', error.message);
        }
    }
}

export default postApi;