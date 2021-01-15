import {
  GET_PUBLIC_ANNOUCE,
  GET_PUBLIC_ANNOUCE_FAIL,
  GET_PUBLIC_ANNOUCE_SUCCESS,
  GET_PRIVATE_ANNOUCE,
  GET_PRIVATE_ANNOUCE_FAIL,
  GET_PRIVATE_ANNOUCE_SUCCESS,
  GET_PRIVATEUSER_ANNOUCE,
  GET_PRIVATEUSER_ANNOUCE_SUCCESS,
  GET_PRIVATEUSER_ANNOUCE_FAIL,
  GET_ANNOUCE_BYID,
  GET_ANNOUCE_BYID_SUCCESS,
  GET_ANNOUCE_BYID_FAIL,
  POST_ANNOUNCE,
  POST_ANNOUNCE_SUCCESS,
  POST_ANNOUNCE_FAIL,
  DELETE_ANNOUNCE_FAIL,
  DELETE_ANNOUNCE_SUCCESS,
  UPDATE_LIKES,
  UPDATE_LIKES_FAIL,
  ADD_COMMENT,
  REMOVE_COMMENT

} from "../constants/actionTypesAnnouce";

// initialState
const initialState = {
  loadAnnounce: false,
  announce: null,
  errors: null,
  loadAnnounceid: false,
  announceid: "",
  errorsid: "",
  loadPostAnnounce: false,
  postAnnounce: null,
  postErrors: null,
  deleteResponse: null,
  deleteErrors: null,
  updatelikefail:null
};

// reducer
const announceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PUBLIC_ANNOUCE:
      return { ...state, loadAnnounce: true };
    case GET_PUBLIC_ANNOUCE_SUCCESS:
      return { ...state, announce: payload, loadAnnounce: false };
    case GET_PUBLIC_ANNOUCE_FAIL:
      return { ...state, errors: payload, loadAnnounce: false };
    case GET_PRIVATE_ANNOUCE:
      return { ...state, loadAnnounce: true };
    case GET_PRIVATE_ANNOUCE_SUCCESS:
      return { ...state, announce: payload, loadAnnounce: false };
    case GET_PRIVATE_ANNOUCE_FAIL:
      return { ...state, errors: payload, loadAnnounce: false };
    // get private user announce
    case GET_PRIVATEUSER_ANNOUCE:
      return { ...state, loadAnnounce: true };
    case GET_PRIVATEUSER_ANNOUCE_SUCCESS:
      return { ...state, announce: payload, loadAnnounce: false };
    case GET_PRIVATEUSER_ANNOUCE_FAIL:
      return { ...state, errors: payload, loadAnnounce: false };
    // get Announce by ID
    case GET_ANNOUCE_BYID:
      return { ...state, loadAnnounceid: true };
    case GET_ANNOUCE_BYID_SUCCESS:
      return { ...state, announceid: payload, loadAnnounceid: false };
    case GET_ANNOUCE_BYID_FAIL:
      return { ...state, errorsid: payload, loadAnnounceid: false };
    // post private announce
    case POST_ANNOUNCE:
      return { ...state, loadPostAnnounce: true };
    case POST_ANNOUNCE_SUCCESS:
      return { ...state, loadPostAnnounce: false, postAnnounce: payload };
    case POST_ANNOUNCE_FAIL:
      return { ...state, loadPostAnnounce: false, postErrors: payload };
    // delete owner announce
    case DELETE_ANNOUNCE_SUCCESS:
      return { ...state,announce:state.announce.filter(post=>post._id!==payload),loadAnnounce:false  }; //deleteResponse: payload
    case DELETE_ANNOUNCE_FAIL:
      return { ...state, deleteErrors: payload };
    
    case UPDATE_LIKES:
      return {
        ...state,
        announce: {
          ...state.announce,
          announces:state.announce.announces.map(
          post => post._id === payload.id ? { ...post, likes: payload.likes }
            : post
        )}, loadAnnounce: false
      };
    case UPDATE_LIKES_FAIL:
      return { ...state, updatelikefail: payload };
    case ADD_COMMENT:
      return {
        ...state,
        
        announceid: {...state.announceid, comments: payload} , loadAnnounce: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        announceid:{...state.announce,comments:state.announceid.comments.filter(comment=>comment._id!==payload), loadAnnounce: false}
      }

    default:
      return state;
  }
};
  
export default announceReducer;
