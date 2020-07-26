import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import {profile} from './profile';
import {rooms} from './rooms';

export const configureStore = () => {
    const store = createStore(combineReducers({
        profile,
        rooms
    }), applyMiddleware(thunk, logger));

    return store
};



