import axios from "axios";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const DELETE_PRODUCT ="DELETE_PRODUCT";
export const getProducts = () => {
    return (dispatch) =>
        axios.get("http://localhost:3000/products")
            .then((res) => {
                console.log(res.data);
                dispatch({type: GET_PRODUCTS, payload: res.data})
            })
            .catch((err) => console.log(err.message))
}

export  const addProduct = (data) => {
    return (dispatch) =>
        axios.post("http://localhost:3000/products", data)
            .then((res) => {
                console.log(res.data);
                dispatch({type: ADD_PRODUCT, payload: data})
            })
            .catch((err) => console.log(err.message))
}

export  const editProduct = (data) => {
    return (dispatch) =>
        axios.put(`http://localhost:3000/products/${data.id}`, data)
            .then((res) => {
                console.log(res.data);
                dispatch({type: EDIT_PRODUCT, payload: data})
            })
            .catch((err) => {console.log(err.message)
                console.log(data);})
}

export  const deleteProduct = (productId) => {
    return (dispatch) =>
        axios.delete(`http://localhost:3000/products/${productId}`)
            .then((res) => {
                dispatch({type: DELETE_PRODUCT, payload: productId})
            })
            .catch((err) => console.log(err.message))
}