export function saveUser(info) {
    return ({
        type: 'SAVE_INFO',
        payload: info
    })
}

export function removeUser() {
    return ({
        type: 'REMOVE_INFO',
    })
}