import axiosClient from "./axiosClient";
import ENDPOINT from "./constants";

const conversationApi = {
    getListConversation: (idUser) => {
        const url = ENDPOINT.GET_LIST_CONVERSATION_BY_USER;
        console.log("IN API", idUser);
        return axiosClient.get(
            url,
            {
                params: {
                    idUser: idUser
                }
            }
        )
    }
}

export default conversationApi;