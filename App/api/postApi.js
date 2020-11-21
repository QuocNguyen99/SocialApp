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

    }
}

export default postApi;