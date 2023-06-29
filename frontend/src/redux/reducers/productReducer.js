import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS
} from "../constants/constants";

export const productReducer = (state = { product: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                isLoading: true,
                product: state,
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                isLoading: false,
                product: state
            }
        case ALL_PRODUCT_FAIL:
            return {
                isLoading: false
            }

        default:
            return state;
    }
}