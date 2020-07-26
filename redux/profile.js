import * as ActionTypes from './ActionTypes';

export const profile = (state = {
    isLoading : true,
    errMess: null,
    profile: null
    }, action) => {

        switch(action.type){
            case ActionTypes.ADD_PROFILE :
                return {...state, profile: action.payload, isLoading: false, errMess: null};

            case ActionTypes.PROFILE_LOADING :
                return {...state, isLoading: true, errMess: null};

            case ActionTypes.PROFILE_FAILED : 
                return {profile: null, isLoading: false, errMess: action.payload}
            
                default:
                    return state;
        }

};