const initValue = {
    infoUser: {}
}

const userReducer = (state = initValue, action) => {
    switch (action.type) {
        case 'SAVE_INFO':
            return {
                ...state,
                infoUser: action.payload
            }
        case 'REMOVE_INFO':
            return {
                ...state,
                infoUser: {}
            }
        default:
            break;
    }
    return state;
}

export default userReducer;