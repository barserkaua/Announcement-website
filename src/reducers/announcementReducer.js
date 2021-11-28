import {
    ANNOUNCEMENT_CREATE_FORM_REQUEST,
    ANNOUNCEMENT_CREATE_FORM_SUCCESS,
    ANNOUNCEMENT_CREATE_FORM_FAIL,

    ANNOUNCEMENT_CREATE_ITEM,
    ANNOUNCEMENT_CREATE_ITEM_SUCCESS,
    ANNOUNCEMENT_CREATE_ITEM_FAIL,

    ANNOUNCEMENT_DELETE_ITEM,

    ANNOUNCEMENT_ITEM_REQUEST,
    ANNOUNCEMENT_ITEM_SUCCESS,
    ANNOUNCEMENT_ITEM_FAIL,
    ANNOUNCEMENT_CREATE_ITEM_RESET,

    ANNOUNCEMENT_DETAILS_REQUEST,
    ANNOUNCEMENT_DETAILS_SUCCESS,
    ANNOUNCEMENT_DETAILS_FAIL,

    ANNOUNCEMENT_UPDATE_REQUEST,
    ANNOUNCEMENT_UPDATE_SUCCESS,
    ANNOUNCEMENT_UPDATE_FAIL,
    ANNOUNCEMENT_UPDATE_RESET,

    ANNOUNCEMENT_UPDATE_ITEM,
} from "../constants/announcementConstants";

// this reducer show all announcement what we have
export const announcementListReducer = (state={announcementListItems:[]}, action) => {
    switch (action.type) {

        case ANNOUNCEMENT_ITEM_REQUEST:
            return {loading:true, announcementListItems:[]}

        case ANNOUNCEMENT_ITEM_SUCCESS:
            return {
                loading:false,
                announcementListItems:action.payload,
            }

        case ANNOUNCEMENT_ITEM_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state
    }
}

// this reducer show only one announcement what we selected (DetailsAnnouncementScreen)
export const announcementDetailsReducer = (state={announcementItem:{} }, action) => {
    switch (action.type) {
        case ANNOUNCEMENT_DETAILS_REQUEST:
            return {loading:true, ...state}

        case ANNOUNCEMENT_DETAILS_SUCCESS:
            return {loading:false, announcementItem: action.payload}

        case ANNOUNCEMENT_DETAILS_FAIL:
            return {loading:false, error: action.payload}

        default:
            return state
    }
}

// we create new announcement, delete and check if success or loading & error
export const announcementReducer = (state={announcementItems:[]}, action) => {
    switch (action.type) {

        case ANNOUNCEMENT_CREATE_ITEM:
            const item = action.payload;
            const existItem = state.announcementItems.find(x => x.id === item.id);
            if (existItem) {
                return {
                    ...state,
                    announcementItems: state.announcementItems.map(x =>
                        x.id === existItem.id ? item : x)
                }
            }else {
                return {
                    ...state,
                    announcementItems: [...state.announcementItems, item]
                }
            }

        case ANNOUNCEMENT_DELETE_ITEM:
            return {...state, announcementItems: state.announcementItems.filter(x => x.id !== action.payload)}

        case ANNOUNCEMENT_UPDATE_ITEM:
            state.announcementItems.map((x, index) =>
                {
                    // we check if we have coincidence by id
                    if (x.id === action.payload.id) {
                        // we replace old item by new with help index on array
                        state.announcementItems[index] = action.payload
                    }
                }
            )

            return {...state, announcementItems: state.announcementItems}

        case ANNOUNCEMENT_CREATE_ITEM_SUCCESS:
            return {...state, loading: false, success: true}

        case ANNOUNCEMENT_CREATE_ITEM_FAIL:
            return {loading: false, error: action.payload}

        case ANNOUNCEMENT_CREATE_ITEM_RESET:
            return {...state, success: false}

        default:
            return state
    }
}
// this reducer only to see if we have error or loading on CreateNewAnnouncement screen
export const announcementFormCreateReducer = (state={}, action) => {
    switch (action.type) {

        case ANNOUNCEMENT_CREATE_FORM_REQUEST:
            return {loading: true}

        case ANNOUNCEMENT_CREATE_FORM_SUCCESS:
            return {loading: false}

        case ANNOUNCEMENT_CREATE_FORM_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}

export const announcementUpdateReducer = (state={}, action) => {
    switch (action.type) {
        case ANNOUNCEMENT_UPDATE_REQUEST:
            return {loading:true}

        case ANNOUNCEMENT_UPDATE_SUCCESS:
            return {loading:false, success: true}

        case ANNOUNCEMENT_UPDATE_FAIL:
            return {loading:false, error: action.payload}

        case ANNOUNCEMENT_UPDATE_RESET:
            return {announcementItem: {}}

        default:
            return state
    }
}