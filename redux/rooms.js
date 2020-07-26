import * as ActionTypes from './ActionTypes';

export const rooms = (state = {
    isLoading : true,
    errMess: null,
    rooms: []
    }, action) => {

        switch(action.type){
            case ActionTypes.ADD_ROOMS :
                return {...state, rooms: action.payload, isLoading: false, errMess: null};

            case ActionTypes.ROOMS_LOADING :
                return {...state, isLoading: true, errMess: null};

            case ActionTypes.ROOMS_FAILED : 
                return {romms: [], isLoading: false, errMess: action.payload}
            
                default:
                    return state;
        }

};