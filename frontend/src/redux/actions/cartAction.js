import axios from "axios";
import { API_PUBLIC_URL } from "../../utils/config";
import {
    ADD_TO_CART,
    DECREASE_QUANTITY_SUCCESS,
    FETCH_DATA_FROM_CART,
    INCREASE_QUANTITY_SUCCESS,
    REMOVE_FROM_CART,
    SET_PAYMENT_METHOD,
    SET_SHIPPING_OPTION,
    UPDATE_NOTE,
} from "./actionTypes";
export const fetchCartSuccess = (cartItems) => ({
    type: FETCH_DATA_FROM_CART,
    payload: cartItems,
});

export const addToCartSuccess = (product) => ({
    type: ADD_TO_CART,
    payload: product,
});

export const removeFromCartSuccess = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
});

export const increaseQuantitySuccess = (productId) => ({
    type: INCREASE_QUANTITY_SUCCESS,
    payload: productId,
});

export const decreaseQuantitySuccess = (productId) => ({
    type: DECREASE_QUANTITY_SUCCESS,
    payload: productId,
});

export const setShippingOption = (option) => ({
    type: SET_SHIPPING_OPTION,
    payload: option,
});

export const setPaymentMethod = (method) => ({
    type: SET_PAYMENT_METHOD,
    payload: method,
});

export const updateNote = (note) => ({
    type: UPDATE_NOTE,
    payload: note,
});

export const saveNote = (note) => {
    return (dispatch) => {
        localStorage.setItem("note", note);
        dispatch(updateNote(note));
    };
};
export const fetchCart = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_PUBLIC_URL}carts/${id}`);
            dispatch(fetchCartSuccess(response.data));
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };
};
export const addToCart = (product) => {
    // {
    //     "userId": "65c2091dc3e076cc6ae53dc2",
    //     "productId": "65db0b69f08a93058c07f04f",
    //     "quantity": 1
    // }
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `${API_PUBLIC_URL}carts/add`,
                product,
            );
            dispatch(addToCartSuccess(response.data));
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };
};

export const removeFromCart = (product) => {
    const userId = product.userId;
    const productId = product.productId;
    const api = `${API_PUBLIC_URL}carts/delete/${userId}/${productId}`;
    return async (dispatch) => {
        try {
            const res = await axios.delete(api);
            dispatch(removeFromCartSuccess(res.data));
        } catch (error) {
            console.error("Error removing from cart:", error.message);
        }
    };
};

export const increaseQuantity = (product) => {
    // {
    //     "userId": "65c2091dc3e076cc6ae53dc2",
    //     "productId": "65db0b69f08a93058c07f04f"
    // }
    return async (dispatch) => {
        try {
            const response = await axios.put(
                `${API_PUBLIC_URL}carts/increase`,
                product,
            );
            dispatch(increaseQuantitySuccess(response.data));
        } catch (error) {
            console.error("Error increasing quantity:", error);
        }
    };
};

export const decreaseQuantity = (product) => {
    // {
    //     "userId": "65c2091dc3e076cc6ae53dc2",
    //     "productId": "65db0b69f08a93058c07f04f"
    // }
    return async (dispatch) => {
        try {
            const response = await axios.put(
                `${API_PUBLIC_URL}carts/decrease`,
                product,
            );
            dispatch(decreaseQuantitySuccess(response.data));
        } catch (error) {
            console.error("Error decreasing quantity:", error);
        }
    };
};

export const handleRemoveProducts = async (userId, productIds) => {
    console.log(typeof productIds);
    try {
        const res = await axios.delete(
            `${API_PUBLIC_URL}carts/delete/${userId}`,
            productIds,
        );
        console.log(res.data);
    } catch (error) {
        console.log("Error remove products from cart: ", error);
    }
};
