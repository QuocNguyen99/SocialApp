import axiosClient from "./axiosClient";
import ENDPOINT from "./constants";

const userApi = {
    createUser: (user) => {
        const url = ENDPOINT.CREATE_USER;
        return axiosClient.post(
            url,
            {
                email: user.email,
                password: user.password,
                displayName: user.displayname
            }
        );
    },
    login: (user) => {
        const url = ENDPOINT.LOGIN;
        return axiosClient.post(
            url,
            {
                email: user.email,
                password: user.password,
            }
        )
    },
    searchUser: (name) => {
        try {
            const url = ENDPOINT.SEARCH_POST_USER;
            return axiosClient.get(
                url,
                {
                    params: {
                        'name': name
                    }
                },
            )
        } catch (error) {
            console.log('Error', error.message);
        }
    }
}

export default userApi;