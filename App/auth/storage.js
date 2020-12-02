import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from "jwt-decode";

const key = "Token";

const storeToken = async (token) => {
    try {
        return await AsyncStorage.setItem(key, token)
    } catch (error) {
        console.log("Error storing the auth token", error.message);
    }
}

const getToken = async () => {
    try {
        return await AsyncStorage.getItem(key)
    } catch (error) {
        console.log("Error getting the auth token", error.message);
    }
}
const getUser = async () => {
    const token = await getToken();
    return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
    try {
        return await AsyncStorage.removeItem(key)
    } catch (error) {
        console.log("Error removing the auth token", error.message);
    }
};

export default {
    getToken,
    getUser,
    removeToken,
    storeToken,
};