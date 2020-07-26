import * as ActionTypes from './ActionTypes';
import {auth, db} from '../firebase/firebase';


export const fetchProfile = () => dispatch => {
    const usersRef = db.collection('userdata');
        usersRef.where('uid', '==', auth.currentUser.uid).get().then(snapshot => {
            if(snapshot.empty){
                let errMess = "User Details not found. Please update your details"
                dispatch(profileFailed(errMess));
            }else{
                snapshot.forEach(document => {
                    dispatch(addProfile(document.data()));
                    return;
                });
            }
        }, err => {
            dispatch(profileFailed(err.toString()));
        });

}; 

export const addProfile = profile => ({
    type: ActionTypes.ADD_PROFILE,
    payload: profile
});

export const profileFailed = errMess => ({
    type: ActionTypes.PROFILE_FAILED,
    payload: errMess
});

export const profileLoading = () => ({
    type: ActionTypes.PROFILE_LOADING,
    payload: null
});

//Rooms

export const fetchRooms = () => dispatch => {
    dispatch(roomsLoading());
    var rooms = [];
    db.collection('rooms').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let room = doc.data();
                console.log(room);
                rooms.push(room);
            });
            dispatch(addRooms(rooms));
            return;
        }, error => {
            dispatch(roomsFailed(error.toString()));
        })
        .catch(error => {
            dispatch(roomsFailed(error.toString()));
        });
    
}

export const addRooms = rooms => ({
    type: ActionTypes.ADD_ROOMS,
    payload: rooms
});

export const roomsLoading = () => ({
    type: ActionTypes.ROOMS_LOADING,
    payload: null
});

export const roomsFailed = errMess => ({
    type: ActionTypes.ROOMS_FAILED,
    payload: errMess
});

export const bookRoom = (roomNumber) => dispatch => {
   db.collection('rooms').where('roomNumber', '==', roomNumber).get()
   db.collection('rooms').get()
   .then(snapshot => {
       snapshot.forEach(doc => {
           if(doc.data().roomNumber == roomNumber){
               db.collection('rooms').doc(doc.id).update({
                available: 'false',
                uid: auth.currentUser.uid,
                bookedOn: new Date().toISOString()
               });
           }
       });
       dispatch(fetchRooms());
       alert('success');
       return;
   }, error => {
      alert(error.toString());
   })
   .catch(error => {
    dispatch(roomsFailed(error.toString()));
   });
}

export const checkOut = (roomNumber) => dispatch => {
    db.collection('rooms').where('roomNumber', '==', roomNumber).get()
    db.collection('rooms').get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            if(doc.data().roomNumber == roomNumber){
                db.collection('rooms').doc(doc.id).update({
                 available: 'true',
                 uid: '',
                 bookedOn: ''
                });
            }
        });
        dispatch(fetchRooms());
        alert('Checked Out Successfully!');
        return;
    }, error => {
       alert(error.toString());
    })
    .catch(error => {
     dispatch(roomsFailed(error.toString()));
    });
 }


