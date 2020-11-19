import axiosClient from "./axiosClient";
import ENDPOINT from "./constants";

const postApi = {
    createPost: (post, token) => {
        const url = ENDPOINT.CREATE_POST;
        try {
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
            );
        } catch (error) {
            return error
        }

    }
}

export default postApi;