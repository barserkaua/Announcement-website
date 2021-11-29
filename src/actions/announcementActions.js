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

    ANNOUNCEMENT_DETAILS_REQUEST,
    ANNOUNCEMENT_DETAILS_SUCCESS,
    ANNOUNCEMENT_DETAILS_FAIL,

    ANNOUNCEMENT_UPDATE_REQUEST,
    ANNOUNCEMENT_UPDATE_SUCCESS,
    ANNOUNCEMENT_UPDATE_FAIL,

    ANNOUNCEMENT_UPDATE_ITEM,

    ANNOUNCEMENT_TOP_REQUEST,
    ANNOUNCEMENT_TOP_SUCCESS,
    ANNOUNCEMENT_TOP_FAIL,
} from "../constants/announcementConstants";

export const listAnnouncement = (announcement) => async (dispatch) => {

    try {
        dispatch({type: ANNOUNCEMENT_ITEM_REQUEST})

        dispatch({
            type: ANNOUNCEMENT_ITEM_SUCCESS,
            payload: announcement
        })


    } catch (error){
        dispatch({
            type: ANNOUNCEMENT_ITEM_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const listAnnouncementDetails = (data) => async (dispatch) => {
    try {
        dispatch({type: ANNOUNCEMENT_DETAILS_REQUEST})

        dispatch({
            type: ANNOUNCEMENT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error){
        dispatch({
            type: ANNOUNCEMENT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


export const listFormAddNewAnnouncement = (id, title, description, date) => async (dispatch, getState) => {

    try {
        // the id that we pass, we just want to get back that announcement data
        dispatch({
            type: ANNOUNCEMENT_CREATE_ITEM,
            payload: {
                id,
                title,
                description,
                date,
            }
        })

        dispatch({
            type: ANNOUNCEMENT_CREATE_ITEM_SUCCESS,
        })

    } catch (error){
        dispatch({
            type: ANNOUNCEMENT_CREATE_ITEM_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }


    // we save our history in localStorage
    localStorage.setItem('announcementItems', JSON.stringify(getState().announcement.announcementItems))
}


export const listFormCreateAnnouncement = () => async (dispatch) => {

    try {
        dispatch({type: ANNOUNCEMENT_CREATE_FORM_REQUEST})

        dispatch({
            type: ANNOUNCEMENT_CREATE_FORM_SUCCESS,
        })

    } catch (error){
        dispatch({
            type: ANNOUNCEMENT_CREATE_FORM_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const removeFromAnnouncement = (id) => async (dispatch, getState) => {

    dispatch({
        type: ANNOUNCEMENT_DELETE_ITEM,
        payload: id
    })

    // we save our history in localStorage
    localStorage.setItem('announcementItems', JSON.stringify(getState().announcement.announcementItems))
}

export const updateFromAnnouncement = (data) => async (dispatch, getState) => {

    dispatch({
        type: ANNOUNCEMENT_UPDATE_ITEM,
        payload: data
    })

    // we save our history in localStorage
    localStorage.setItem('announcementItems', JSON.stringify(getState().announcement.announcementItems))
}

export const updateAnnouncement = () => async (dispatch, getState) => {
    try {
        dispatch({type: ANNOUNCEMENT_UPDATE_REQUEST})

        dispatch({
            type: ANNOUNCEMENT_UPDATE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: ANNOUNCEMENT_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


export const topListAnnouncement = (announcement) => async (dispatch) => {

    try {
        dispatch({type: ANNOUNCEMENT_TOP_REQUEST})

        dispatch({
            type: ANNOUNCEMENT_TOP_SUCCESS,
            payload: announcement
        })


    } catch (error){
        dispatch({
            type: ANNOUNCEMENT_TOP_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}