const initialState = {
    curretUser: null,
};

export const user = (state = initialState, action) => {
    return {
        ...state,
        currentUser: action.currentUser,
    };
};
