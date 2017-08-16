const setUserInfo = (state,obj) => {
    state.userInfo = obj;
}
const clearUserInfo = (state) => {
    state.userInfo = null;
}

const setMenuArray = (state,arr) => {
    state.menuArray = arr;
}

export {
    setUserInfo,
    clearUserInfo,
    setMenuArray
}