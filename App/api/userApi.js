import axiosClient from "./axiosClient";
import ENDPOINT from "./constants";

const userApi = {
    createUser: (user) => {
        const url = ENDPOINT.CREATE_USER;
        console.log(url);
        return axiosClient.post(
            url,
            {
                email: user.email,
                password: user.password,
                displayName: user.displayname
            }
        );
    }
}

export default userApi;