import axiosClient from "./axiosClient";
import ENDPOINT from "./constants";

const commentApi = {
    getListComments: (id) => {
        try {
            const url = ENDPOINT.GET_LIST_COMMENT_BY_ID;
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
    createComments: (id, comment, token) => {
        try {
            const url = ENDPOINT.CREATE_COMMENT_BY_ID;
            return axiosClient.post(
                url,
                {
                    comment: comment
                },
                {
                    headers: {
                        'token': token
                    },
                    params: {
                        id: id
                    }
                }
            )
        } catch (error) {
            console.log('err', error.message);
        }
    }
}

export default commentApi;