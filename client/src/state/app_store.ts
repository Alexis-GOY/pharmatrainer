import {createStore} from "redux";
import {initialState, pharma_app} from "./reducers";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__: any,
    }
}

export const store = createStore(pharma_app,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


export const unsubscribeStore = store.subscribe(() => console.log(store.getState()));
