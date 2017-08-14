const setUserInfo = (state,obj) => {
    state.userInfo = obj;
}
const clearUserInfo = (state) => {
    state.userInfo = null;
}

export {
    setUserInfo,
    clearUserInfo
}