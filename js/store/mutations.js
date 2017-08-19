const setUserInfo = (state,obj) => {
    state.userInfo = obj;
}
const clearUserInfo = (state) => {
    state.userInfo = null;
}

const setMenuArray = (state,arr) => {
    state.menuArray = arr;
}

const setCommonRight = (state,obj) => {
    state.commonRight = obj;
}

export {
    setUserInfo,
    clearUserInfo,
    setMenuArray,
    setCommonRight
}