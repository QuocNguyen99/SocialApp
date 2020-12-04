const ENDPOINT = {
    CREATE_USER: '/user',
    LOGIN: '/auth',
    CREATE_POST: '/posts',
    GET_LIST_POST: '/posts/:page',
    DELETE_POST: '/posts/:id',
    GET_POST_BY_ID: '/posts/getpostbyid/:id',
    UPDATE_POST: '/posts/:id',
    LIKE_POST: '/posts/like/:id',
    GET_LIST_COMMENT_BY_ID: '/comment/:id',
    CREATE_COMMENT_BY_ID: '/comment/:id',
}
export default ENDPOINT;