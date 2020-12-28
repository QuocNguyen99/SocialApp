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
    },
    getInfoUser: (id) => {
        try {
            const url = ENDPOINT.GET_USER;
            return axiosClient.get(
                url,
                {
                    params: {
                        idUser: id
                    }
                },
            )
        } catch (error) {
            console.log('Error', error.message);
        }
    },
    changeInforUser: (id, userUpdate, token) => {
        try {
            const url = ENDPOINT.CHANGE_INFO_USER;
            return axiosClient.put(
                url,
                {
                    userUpdate: userUpdate
                },
                {
                    headers: {
                        'token': token
                    },
                    params: {
                        idUser: id
                    }
                },
            )
        } catch (error) {
            console.log('Error', error.message);
        }
    },
    changeAvataUser: (id, avataUpdate, avataCurrent, token) => {
        try {
            const url = ENDPOINT.CHANGE_AVATA_USER;
            return axiosClient.put(
                url,
                {
                    avataUpdate: avataUpdate,
                    avataCurrent: avataCurrent
                },
                {
                    headers: {
                        'token': token
                    },
                    params: {
                        idUser: id
                    }
                },
            )
        } catch (error) {
            console.log('Error', error.message);
        }
    },
    changeImageCoverUser: (id, imageCoverUpdate, imageCoverCurrent, token) => {
        try {
            const url = ENDPOINT.CHANGE_IMAGE_COVER_USER;
            return axiosClient.post(
                url,
                {
                    imageCoverUpdate: imageCoverUpdate,
                    imageCoverCurrent: imageCoverCurrent
                },
                {
                    headers: {
                        'token': token
                    },
                    params: {
                        idUser: id
                    }
                },
            )
        } catch (error) {
            console.log('Error', error.message);
        }
    },
    changePassword: (id, oldPass, newPass, token) => {
        try {
            const url = ENDPOINT.CHANGE_PASSWORD_USER;
            return axiosClient.post(
                url,
                {
                    oldPass: oldPass,
                    newPass: newPass
                },
                {
                    headers: {
                        'token': token
                    },
                    params: {
                        idUser: id
                    }
                },
            )
        } catch (error) {
            console.log('Error', error.message);
        }
    }
}

export default userApi;