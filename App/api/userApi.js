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
    }
}

export default userApi;