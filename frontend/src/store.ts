import { createStore } from "vuex";
import type { ProductType } from "./tools/type";

type stateType = {
    token: string,
    products: ProductType[],
    order: []
    logged:boolean
}

export default createStore({
    state() {
        return {
            token: '',
            products: [],
            order: [],
            logged: false
        }
    },
    mutations: {
        loadProducts(state: stateType, products:ProductType[]) {
            state.products = products
        },
        setLogged(state: stateType, logged:boolean) {
            state.logged = logged
        }
    }
});