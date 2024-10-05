const BASE_URL = "https://apivrhere.mahitechnocrafts.in/api/v1"

// ??USER APIS
export const userEndpoints = {
    // vendor
    LOGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/register",

    // user
    USER_LOGIN_API: BASE_URL + "/auth/userlogin",
    USER_SIGNUP_API: BASE_URL + "/auth/userregister",
    GET_VENDOR: BASE_URL + "/auth/get",

    FETCH_PROFILE: BASE_URL + "/auth/fetchMyProfile",
    CONTACT: BASE_URL + "/contact/create",


}

export const roomEndpoints = {
    IMAGE_UPLOAD: BASE_URL + "/image/multi",
    ALL_LOCATION: BASE_URL + "/location/getlocations",
    LOCATION_BY_ID: BASE_URL + "/location/get",
    ADD_ROOM_API: BASE_URL + "/room/create",
    ROOM_UPDATE_API: BASE_URL + "/room/update",
    VISIT_API: BASE_URL + "/visits",

    ROOM_LEADING: BASE_URL + "/room/leading",
    ADD_LEADING: BASE_URL + "/room/addleads",
    FIND_ROOM_API: BASE_URL + "/room",
    ALL_ROOM: BASE_URL + "/room/getAll",
    SINGLE_ROOM: BASE_URL + "/room/get",
}
export const tifinEndpoints = {
    ADD_TIFIN_API: BASE_URL + "/tifin/create",
    ADD_UPDATE_API: BASE_URL + "/tifin/update",
    FIND_TIFIN_API: BASE_URL + "/tifin",
    FIND_ALL_TIFIN_API: BASE_URL + "/tifin/getAll",


    SINGLE_TIFIN: BASE_URL + "/tifin/get",

}



export const ratingEndpoints = {
    ADD_RATING_API: BASE_URL + "/rating/create",
    UPDATE_RATING_API: BASE_URL + "/rating/edit",
    CHECK_RATING_API: BASE_URL + "/rating/checkrating",

    GET_ROOM_AVERAGE: BASE_URL + "/rating/avgratingroom",
    GET_TIFIN_AVERAGE: BASE_URL + "/rating/avgratingtifin",

}