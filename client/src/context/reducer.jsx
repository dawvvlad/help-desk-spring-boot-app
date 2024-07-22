export const reducer = (state, { type, payload }) => {
    switch (type) {

        case "SET_USER_DATA":
            return {
                ...state,
                userData: payload
            }

        case "SET_IS_LOADING":
            return {
                ...state,
                isLoading: payload
            };
        case "SET_RESOURCES":
            return {
                ...state,
                resources: payload
            }
        case "SET_TARGET_ID":
            return {
                ...state,
                targetId: payload
            }
        case "SET_IS_ADMIN":
            return {
                ...state,
                isAdmin: payload
            }
        default: return state;
    }
}