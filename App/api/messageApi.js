import axiosClient from "./axiosClient";
import ENDPOINT from "./constants";

const messageApi = {
    getListMessage: (idConversation) => {
        try {
            const url = ENDPOINT.GET_LIST_MESSAGE;
            return axiosClient.get(
                url,
                {
                    params: {
                        idConversation
                    }
                }
            )
        } catch (error) {
            console.log('LIST MESS', error.message);
        }
    },
    createMessage: (idConversation, message, token) => {
        try {
            const url = ENDPOINT.SEND_MESSAGE;
            return axiosClient.post(
                url,
                {
                    idConversation,
                    message
                },
                {
                    headers: {
                        token
                    }
                })
        } catch (error) {
            console.log('CREATE MESSAGE', error.message);
        }
    }
}

export default messageApi;