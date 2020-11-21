export function saveUser(info) {
    return ({
        type: 'SAVE_INFO',
        payload: info
    })
}