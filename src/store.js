import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import {
    announcementReducer,
    announcementListReducer,
    announcementFormCreateReducer,
    announcementDetailsReducer,
    announcementUpdateReducer,
} from "./reducers/announcementReducer";

const reducer = combineReducers({
    announcement: announcementReducer,
    announcementList: announcementListReducer,
    announcementFormCreate: announcementFormCreateReducer,
    announcementDetails: announcementDetailsReducer,
    announcementUpdate: announcementUpdateReducer,
});

const announcementItemFromStorage = localStorage.getItem('announcementItems') ?
    JSON.parse(localStorage.getItem('announcementItems')) : []

const initialState = {
    announcement: {
        announcementItems: announcementItemFromStorage,
    },
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)));

export default store;