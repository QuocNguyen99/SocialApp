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
    }
}

export default messageApi;