import configureStore from "@reduxjs/toolkit"

export const store = configureStore({
    reducer : {
        products : productReducer,
        cart : cartReducer
    }
})