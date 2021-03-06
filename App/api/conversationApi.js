import axiosClient from "./axiosClient";
import ENDPOINT from "./constants";

const conversationApi = {
    getListConversation: (idUser) => {
        const url = ENDPOINT.GET_LIST_CONVERSATION_BY_USER;
        return axiosClient.get(
            url,
            {
                params: {
                    idUser: idUser
                }
            }
        )
    },
    createConversation: (idUser, idOtherMember, token) => {
        const url = ENDPOINT.CREATE_CONVERSATION;
        return axiosClient.post(
            url,
            {
                conversation: {
                    members: [idUser, idOtherMember]
                }
            },
            {
                headers: {
                    token: token
                }
            }
        )
    },
    deleteConversation: (idConversation, token) => {
        const url = ENDPOINT.DELETE_CONVERSATION;
        console.log(idConversation);
        return axiosClient.delete(
            url,
            {
                headers: {
                    token: token
                },
                params: {
                    idConversation
                }
            }
        )
    }
}

export default conversationApi;