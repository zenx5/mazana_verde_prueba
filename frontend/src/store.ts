import { createStore } from "vuex";
import type { ProductType } from "./tools/type";

type stateType = {
    user: {
        name: string,
        email: string,
        id: number
        updated_at: string,
        created_at: string
    },
    token: string,
    products: ProductType[],
    order: []
    logged:boolean
}

export default createStore({
    state() {
        return {
            user: null,
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
        },
        setUser(state: stateType, user:stateType['user']) {
            state.user = user
        },
        setToken(state: stateType, token:string) {
            state.token = token
        }
    }
});