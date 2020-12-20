const ENDPOINT = {
    CREATE_USER: '/user',
    GET_USER: '/user',
    LOGIN: '/auth',
    CREATE_POST: '/posts',
    GET_LIST_POST: '/posts/:page',
    GET_LIST_POST_BY_ID_USER: '/posts/list/:id',
    DELETE_POST: '/posts/:id',
    GET_POST_BY_ID: '/posts/getpostbyid/:id',
    UPDATE_POST: '/posts/:id',
    LIKE_POST: '/posts/like/:id',
    GET_LIST_COMMENT_BY_ID: '/comment/:id',
    GET_LIST_REPLY_BY_IDCOMMENT: '/comment/reply/:id',
    GET_REPLY_LENGTH: '/comment/replylength/:id',
    CREATE_COMMENT_BY_ID: '/comment/:id',
    CREATE_REPLY_BY_IDCOMMENT: '/comment/reply/:id',
    SEARCH_POST_USER: '/posts/search/:content',
    CHANGE_INFO_USER: '/user/:id'
}
export default ENDPOINT;