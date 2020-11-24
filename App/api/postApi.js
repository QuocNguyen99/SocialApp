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
                    likeUser: post.likeUser
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
    }
}

export default postApi;