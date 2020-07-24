import {config} from './config';
import firebase from 'firebase';

firebase.initializeApp(config);

export const auth = firebase.auth();

export const fireAuth = firebase.auth;

export var storageRef = firebase.storage().ref();

export var db = firebase.firestore();